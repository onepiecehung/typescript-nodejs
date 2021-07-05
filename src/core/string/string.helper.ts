class StringHelper {
    _this: any;
    constructor() {
        this._this = this;
    }

    standardize(string: string) {
        return string.replace(/\s+/g, " ").trim();
    }

    removeVietnameseAccents(string: string) {
        string = string.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        string = string.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        string = string.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        string = string.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        string = string.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        string = string.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        string = string.replace(/đ/g, "d");
        string = string.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        string = string.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        string = string.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        string = string.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        string = string.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        string = string.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        string = string.replace(/Đ/g, "D");
        return string;
    }

    removeSpecialCharacters(string: string) {
        return string.replace(
            /[^0-9a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]/gi,
            ""
        );
    }

    isObjectId(string: string) {
        return string.match(/^[0-9a-fA-F]{24}$/);
    }

    generateString(set: any, length: number) {
        let setLen = set.length,
            salt = "";

        for (let i = 0; i < length; i++) {
            let p = Math.floor(Math.random() * setLen);
            salt += set[p];
        }

        return salt;
    }

    generateCode(length: number) {
        var INVITE_CODE_SET = "0123456789ABCDEFGHIJKLMNOPQURSTUVWXYZ";
        return this.generateString(INVITE_CODE_SET, length || 6);
    }
}
