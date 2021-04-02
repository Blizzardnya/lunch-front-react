import CryptoJS from "crypto-js";
import { createTransform } from "redux-persist";

const encrypt = createTransform(
  (inboundState, _key) => {
    if (!inboundState) return inboundState;

    const cryptedText = CryptoJS.AES.encrypt(
      JSON.stringify(inboundState),
      process.env.REACT_APP_ACCOUNT_KEY as string
    );

    return cryptedText.toString();
  },
  (outboundState, _key) => {
    if (!outboundState) return outboundState;

    const bytes = CryptoJS.AES.decrypt(
      outboundState as string,
      process.env.REACT_APP_ACCOUNT_KEY as string
    );
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decrypted);
  },
  { whitelist: ["account"] }
);

export default encrypt;
