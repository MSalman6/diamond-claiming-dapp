import BN from "bn.js";
import { ethers, getAddress } from "ethers";
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';
import { MESSAGES } from "../../constants/messages";  
import { useEffect, useRef, useState } from "react";
import { useRootContext } from "../../contexts/RootContext/RootContext";
import { ensure0x } from "diamond-contracts-claiming/dist/api/src/cryptoHelpers";

const DmdDiamondClaiming = () => {
  const {
    account,
    claimApi,
    showLoader,
    connectWallet,
    getClaimTxHash,
    handleErrorMsg,
    ensureWalletConnection,
  } = useRootContext();
  
  const [darkMode, setDarkMode] = useState(false);
  const [v3Address, setV3Address] = useState("");
  const [v4Address, setV4Address] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [signedMessage, setSignedMessage] = useState("");
  const [claimError, setClaimError] = useState<string>("");
  const [claimedTxHash, setClaimedTxHash] = useState<string>("");
  const [claimSuccess, setClaimSuccess] = useState<boolean>(false);
  const [fetchingBalance, setFetchingBalance] = useState<boolean>(false);
  const [signatureError, setSignatureError] = useState<string | null>(null);
  const [claimableBalance, setClaimableBalance] = useState<string | null>();
  const [validV3Address, setValidV3Address] = useState<boolean | null>(null);
  const [validV4Address, setValidV4Address] = useState<boolean | null>(null);
  const [claimMessagePrefix, setClaimMessagePrefix] = useState<string>(process.env.REACT_APP_CLAIM_MESSAGE_PREFIX + v4Address);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (!v3Address || v3Address.length !== 34) return;
      checkForBalance();
    } catch (e) {}
  }, [v3Address]);

  const checkForBalance = async () => {
    try {
      setFetchingBalance(true);
      const v4Address = ensure0x(claimApi.cryptoJS.dmdAddressToRipeResult(v3Address));
      setValidV3Address(true);
      getClaimTxHash(v4Address).then(async (res: string | null) => {
        if (res) {
          setClaimError("");
          setClaimedTxHash(res || "");
          setClaimableBalance(null);
        } else {
          await claimApi.getBalance(v3Address).then((res: BN) => {
            if (res >= new BN(ethers.parseEther("0").toString())) {
              setClaimError("");
              setClaimedTxHash("");
              setClaimableBalance(ethers.formatEther(res.toString()));
            } else {
              setClaimedTxHash("");
              setClaimableBalance(null);
              setClaimError(
                MESSAGES.snapshotBalanceError
              );
            }
          });
        }
        setFetchingBalance(false);
      });
    } catch(err: any) {
      if (err.message.includes("Non-base58") || err.message.includes("Invalid")) {
        // toast.error(MESSAGES.invalidAddress);
      } else {
        console.log("[ERROR] Err", err);
      }
      setClaimedTxHash("");
      setValidV3Address(false);
      setClaimableBalance(null);
      setFetchingBalance(false);
    }
  };

  const claimSubmit = async (e: any) => {
    e.preventDefault();
    if (!ensureWalletConnection()) return;

    showLoader(true, "Claiming... 💎");
    const postFix = claimMessagePrefix.split(v4Address)[1] || "";

    claimApi.claim(v3Address, v4Address, signedMessage, postFix).then(async (res: any) => {
      showLoader(false, "");
      setSignatureError(null);
      if (res.status) {
        setClaimSuccess(true);
        await checkForBalance();
        toast.success(MESSAGES.claimSuccess);
      } else {
        let errMsg = MESSAGES.claimError;
        if (res.msg && res.msg.includes("signature")) 
        {
          errMsg = res.msg.charAt(0).toUpperCase() + res.msg.slice(1);
          setSignatureError(
            MESSAGES.signatureError
          );
        }
        if (res.msg && res.msg.includes("rejected")) errMsg = res.msg.charAt(0).toUpperCase() + res.msg.slice(1);
        toast.error(errMsg);
      }
    })
    .catch((err: any) => {
      showLoader(false, "");
      console.log("[ERROR] Err", err);
      handleErrorMsg(err, "Couldn't claim, please try again later");
    });
  };

  const handleV4AddressChange = (e: any) => {
    const v4Address = getAddress(e.target.value);
    try {
      if (v4Address) {
        setValidV4Address(true);
      } else {
        setValidV4Address(false);
      }
    } catch (err) {
      setValidV4Address(false);
    }

    setV4Address(v4Address);
    setClaimMessagePrefix(process.env.REACT_APP_CLAIM_MESSAGE_PREFIX + v4Address);
  }

  const handleSignatureChange = async (newVal: any) => {
    try {
      const prefixString = await claimApi.prefixString();
      const postFix = claimMessagePrefix.split(v4Address)[1] || "";

      claimApi.cryptoJS.getPublicKeyFromSignature(
        newVal,
        prefixString + v4Address + postFix,
        true
      );

      const rs = claimApi.cryptoJS.signatureBase64ToRSV(newVal);

      // Convert Buffer to hex
      const rHex = "0x" + Buffer.from(rs.r).toString("hex");
      const sHex = "0x" + Buffer.from(rs.s).toString("hex");
      
      // Validate lengths
      if (rHex.length !== 66) throw new Error("Invalid 'r' value length.");
      if (sHex.length !== 66) throw new Error("Invalid 's' value length.");

      setSignatureError(null);
    } catch (err) {
      setSignatureError(
        MESSAGES.signatureError
      );
    }

    setSignedMessage(newVal);
  }

  // Prevent form submission if Enter key is pressed
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', darkMode ? 'light' : 'dark');
  };

  const copyText = () => {
    copy(claimMessagePrefix);
    toast.success(MESSAGES.copiedToClipboard);
  };

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <div className="navbar">
        <a href={process.env.REACT_APP_WIKI_URL || "#"} target="_blank">
          User Guide: <strong>How to claim <span className="diamond">💎</span></strong>
        </a>
        <div className="btnsContainer">
          <button onClick={toggleDarkMode} className="primaryBtn theme">
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-cloud-moon'}`}></i>
          </button>
          <button className="primaryBtn walletConnectBtn" onClick={connectWallet}>{account ? account : 'Connect Wallet'}</button>
        </div>
      </div>

      <div className="form-container">
        <div className="step-indicator">
          <div className={`step active`}></div>
          <div className={`step ${claimableBalance && "active"}`}></div>
          <div className={`step ${claimableBalance && validV4Address && "active"}`}></div>
          <div className={`step ${claimableBalance && validV4Address && signedMessage && "active"}`}></div>
        </div>
        <div className="form-content">
          <h1>Claim your V4 DMD Coins</h1>
          <form onSubmit={claimSubmit} onKeyDown={handleKeyDown}>
            <input
              placeholder="Please specify your v3 address"
              onChange={(e) => setV3Address(e.target.value)}
              required
              minLength={34}
              maxLength={34} />

            {validV3Address === false && (<p className="text-error">{MESSAGES.invalidV3Address}</p>)}

            {claimableBalance || fetchingBalance ? (
              <div>
                {
                  fetchingBalance ? (
                    <p>{MESSAGES.fetchingBalance}</p>
                  ) : (
                    <p>{MESSAGES.claimableDmd} <strong>{Number(claimableBalance).toFixed(2)} DMD</strong></p>
                  )
                }
              </div>
            ) : claimedTxHash ? claimSuccess ? (<div>
              <p className="text-success">
                Claimed successfully! Please check the transaction here{" "}
                <a
                  href={process.env.REACT_APP_EXPLORER_TX_URL + claimedTxHash}
                  target="_blank"
                >
                  [link]
                </a>
              </p>
            </div>) :
            (
              <div>
                <p className="text-error">
                  {MESSAGES.alreadyClaimed}
                  <a
                    href={process.env.REACT_APP_EXPLORER_TX_URL + claimedTxHash}
                    target="_blank"
                  >
                    [link]
                  </a>
                </p>
              </div>
            ) : (
              <div><p className="text-error">{claimError}</p></div>
            )}

            {claimableBalance && (
              <>
                <input
                  placeholder="Please specify your v4 address"
                  onChange={(e) => handleV4AddressChange(e)}
                  required
                  minLength={42}
                  maxLength={42}
                />
                {validV4Address === false && (
                  <p className="text-error">
                    {MESSAGES.invalidV4Address}
                  </p>
                )}
              </>
            )}

            {validV4Address && claimableBalance && (
              <div className="textarea-container">
                <textarea
                  id="claimMessagePrefix"
                  value={claimMessagePrefix}
                  onChange={(e) => setClaimMessagePrefix(e.target.value)}
                />
                <button type="button" onClick={copyText}>
                  <i className="fas fa-copy"></i>
                  <span className="tooltip">{copySuccess ? 'Copied!' : ''}</span>
                </button>
              </div>
            )}

            {validV4Address && claimableBalance && (
              <>
                <input
                  placeholder="Please provide the signature you've generated"
                  onChange={(e) => handleSignatureChange(e.target.value)}
                  required
                />

                <p className="text-error">{signatureError}</p>
              </>
            )}

            {validV4Address && claimableBalance && signedMessage && !signatureError && (
              <div className="terms-container" style={{ margin: '20px 0' }}>
                <label className="terms-label">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    style={{ marginTop: '2px', flexShrink: 0 }}
                  />
                  <span className="terms-text">
                    I have read and accept the{' '}
                    <a
                      href="https://github.com/DMDcoin/whitepaper/wiki/F.-Blockchain-Coin-Economy#f42-claiming-roadmap"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontWeight: 'bold', textDecoration: 'underline' }}
                    >
                      DMD Diamond Whitepaper Ruleset
                    </a>
                    {' '}and agree to claim my Airdrop funds under these terms.
                  </span>
                </label>
              </div>
            )}

            {validV4Address && claimableBalance && signedMessage && (
              <button disabled={
                claimableBalance && !signatureError && parseFloat(claimableBalance) > -1 && termsAccepted
                  ? false
                  : true
              } className="primaryBtn" type="submit">
                <span className="diamond">💎</span> Claim
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DmdDiamondClaiming;
