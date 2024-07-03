export function validationBankInfo (body: any){
    let bodyData = {
        full_name: "",
        bank_name: "",
        bank_account_name: "",
        bank_account_number: "",
        ktp: "",
        npwp: ""
    }; 
    let status = true;
    if (body.full_name === "") {
        bodyData.full_name = "Please fill your full name first"
        status = false;
    }  
    if (body.bank_name === "") {
        bodyData.bank_name = "Please choose your bank name first"
        status = false;
    } 
    if (body.bank_account_name === "") {
        bodyData.bank_account_name = "Please fill your name on bank account first"
        status = false;
    }
    if (body.bank_account_number === "") {
        bodyData.bank_account_number = "Please fill your account number first"
        status = false;
    }
    if (body.ktp === "") {
        bodyData.ktp = "Please upload your identity document photo first"
        status = false;
    } 
    if (body.npwp === "") {
        bodyData.npwp = "Please upload your photo of NPWP card first"
        status = false;
    }
    return {bodyData, status};
}