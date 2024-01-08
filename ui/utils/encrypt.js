import JSEncrypt from 'jsencrypt';

const encrypt = raw => {
    let encryptor = new JSEncrypt();
    encryptor.setPublicKey(import.meta.env.VITE_APP_PUBLIC_KEY);
    return encryptor.encrypt(raw);
}

export default encrypt;