import bcryptjs from 'bcryptjs';


class EncryptService {

    async hashPass(passToHash) {
        const hash = await bcryptjs.hash(passToHash, 10);
        return hash;
    }

    async hashedPassCompare(unhashedPass, hashedPass) {
        const res = await bcryptjs.compare(unhashedPass, hashedPass);
        return res;
    }

}

export default new EncryptService();