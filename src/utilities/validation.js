import validator from "validator";

const niNumberRegex = /^\s*[a-zA-Z]{2}(?:\s*\d\s*){6}[a-zA-Z]{1,}?\s*$/;
const isEmpty = (value) => value === undefined || value === null || (typeof value === "object" && Object.keys(value).length === 0) || (typeof value === "string" && value.trim().length === 0);

const validation = async (post) => {
    let errors = {};

    let firstname = !isEmpty(post?.firstname) ? post?.firstname.toString() : "";
    let lastname = !isEmpty(post?.lastname) ? post?.lastname.toString() : "";
    let dob = !isEmpty(post?.dob) ? post?.dob.toString() : "";
    let ninumber = !isEmpty(post?.ninumber) ? post?.ninumber.toString() : "";
    let englishlevel = !isEmpty(post?.englishlevel) ? post?.englishlevel.toString() : "";
    let mobile = !isEmpty(post?.mobile) ? post?.mobile.toString() : "";
    let postalcode = !isEmpty(post?.postalcode) ? post?.postalcode.toString() : "";

    let accdate = !isEmpty(post?.accdate) ? post?.accdate.toString() : "";
    let acctime = !isEmpty(post?.acctime) ? post?.acctime.toString() : "";
    let circumcode = !isEmpty(post?.circumcode) ? post?.circumcode.toString() : "";
    let location = !isEmpty(post?.location) ? post?.location.toString() : "";
    let description = !isEmpty(post?.description) ? post?.description.toString() : "";
    let driverpassenger = !isEmpty(post?.driverpassenger) ? post?.driverpassenger.toString() : "";
    let injclasscode = !isEmpty(post?.injclasscode) ? post?.injclasscode.toString() : "";
    let injdescription = !isEmpty(post?.injdescription) ? post?.injdescription.toString() : "";
    let injlength = !isEmpty(post?.injlength) ? post?.injlength.toString() : "";
    let medicalinfo = !isEmpty(post?.medicalinfo) ? post?.medicalinfo.toString() : "";
    let medicalevidence = !isEmpty(post?.medicalevidence) ? post?.medicalevidence.toString() : "";

    let registerationno = !isEmpty(post?.registerationno) ? post?.registerationno.toString() : "";
    let makemodel = !isEmpty(post?.makemodel) ? post?.makemodel.toString() : "";

    if (validator.isEmpty(firstname)) {
        errors.firstname = "First name is required";
    } else if (!validator.isLength(firstname, { min: 2, max: 50 })) {
        errors.firstname = "First name must be between 2 to 50 characters";
    }

    if (validator.isEmpty(lastname)) {
        errors.lastname = "Last name is required";
    } else if (!validator.isLength(lastname, { min: 2, max: 50 })) {
        errors.lastname = "Last name must be between 2 to 50 characters";
    }

    if (validator.isEmpty(medicalevidence) && medicalinfo === "Y") {
        errors.medicalevidence = "Medical evidance is required";
    }

    if (validator.isEmpty(dob)) {
        errors.dob = "Date of birth is required";
    }

    if (ninumber !== "WILL BE PROVIDED TO SOLICITOR" && ninumber !== "Minor") {
        let ninumberFirstChar = ninumber[0];
        let ninumberSecondChar = ninumber[1];
        let prefix = ninumberFirstChar + ninumberSecondChar;
        let prefixCheckList = ["BG", "GB", "KN", "NK", "NT", "TN", "ZZ"];
        let checklist = "D,F,I,Q,U,V";
        if (validator.isEmpty(ninumber)) {
            errors.ninumber = "NI number is required";
        } else if (checklist.includes(ninumberSecondChar) || checklist.includes(ninumberFirstChar) || ninumber[1] === "O" || prefixCheckList.includes(prefix)) {
            errors.ninumber = "NI number is required";
        } else if (!validator.matches(ninumber, niNumberRegex)) {
            errors.ninumber = "NI number is not valid";
        }
    }

    if (validator.isEmpty(englishlevel)) {
        errors.englishlevel = "English level is required";
    }

    if (validator.isEmpty(mobile)) {
        errors.mobile = "Mobile number is required";
    } else if (!validator.isMobilePhone(mobile)) {
        errors.mobile = "Incorrect mobile number";
    }

    if (validator.isEmpty(postalcode)) {
        errors.postalcode = "Address is required";
    }

    if (validator.isEmpty(accdate)) {
        errors.accdate = "Accident date is required";
    }

    if (validator.isEmpty(acctime)) {
        errors.acctime = "Accident time is required";
    }

    if (validator.isEmpty(circumcode)) {
        errors.circumcode = "Circumstances is required";
    }

    if (validator.isEmpty(location)) {
        errors.location = "Location is required";
    }

    if (validator.isEmpty(description)) {
        errors.description = "Description is required";
    }

    if (validator.isEmpty(driverpassenger)) {
        errors.driverpassenger = "Claimant is required";
    }

    if (validator.isEmpty(injclasscode)) {
        errors.injclasscode = "Injury classification is required";
    }

    if (validator.isEmpty(injdescription)) {
        errors.injdescription = "Injury description is required";
    }

    if (validator.isEmpty(injlength) && post.ongoing !== "Y") {
        errors.injlength = "Length of injury is required";
    }

    if (validator.isEmpty(registerationno)) {
        errors.registerationno = "Registration number is required";
    }

    if (validator.isEmpty(makemodel)) {
        errors.makemodel = "Make model is required";
    }

    console.log(errors);
    return {
        isValid: isEmpty(errors),
        errors,
    };
};

const passengerValidation = async (post) => {
    let errors = {};

    let firstname = !isEmpty(post?.firstname) ? post?.firstname.toString() : "";
    let lastname = !isEmpty(post?.lastname) ? post?.lastname.toString() : "";
    let dob = !isEmpty(post?.dob) ? post?.dob.toString() : "";
    let ninumber = !isEmpty(post?.ninumber) ? post?.ninumber.toString() : "";
    let mobile = !isEmpty(post?.mobile) ? post?.mobile.toString() : "";
    let postalcode = !isEmpty(post?.postalcode) ? post?.postalcode.toString() : "";
    let injclasscode = !isEmpty(post?.injclasscode) ? post?.injclasscode.toString() : "";
    let driverpassen = !isEmpty(post?.driverpassen) ? post?.driverpassen.toString() : "";
    let injdescr = !isEmpty(post?.injdescr) ? post?.injdescr.toString() : "";
    let detail = !isEmpty(post?.detail) ? post?.detail.toString() : "";
    let medicalinfo = !isEmpty(post?.medicalinfo) ? post?.medicalinfo.toString() : "";
    let evidencedatails = !isEmpty(post?.evidencedatails) ? post?.evidencedatails.toString() : "";

    if (validator.isEmpty(firstname)) {
        errors.firstname = "First name is required";
    } else if (!validator.isLength(firstname, { min: 2, max: 50 })) {
        errors.firstname = "First name must be between 2 to 50 characters";
    }

    if (validator.isEmpty(evidencedatails) && medicalinfo === "Y") {
        errors.evidencedatails = "Medical evidance is required";
    }

    if (validator.isEmpty(lastname)) {
        errors.lastname = "Last name is required";
    } else if (!validator.isLength(lastname, { min: 2, max: 50 })) {
        errors.lastname = "Last name must be between 2 to 50 characters";
    }

    if (validator.isEmpty(dob)) {
        errors.dob = "Date of birth is required";
    }

    if (ninumber !== "WILL BE PROVIDED TO SOLICITOR" && ninumber !== "Minor") {
        let ninumberFirstChar = ninumber[0];
        let ninumberSecondChar = ninumber[1];
        let prefix = ninumberFirstChar + ninumberSecondChar;
        let prefixCheckList = ["BG", "GB", "KN", "NK", "NT", "TN", "ZZ"];
        let checklist = "D,F,I,Q,U,V";
        if (validator.isEmpty(ninumber)) {
            errors.ninumber = "NI number is required";
        } else if (checklist.includes(ninumberSecondChar) || checklist.includes(ninumberFirstChar) || ninumber[1] === "O" || prefixCheckList.includes(prefix)) {
            errors.ninumber = "NI number is required";
        } else if (!validator.matches(ninumber, niNumberRegex)) {
            errors.ninumber = "NI number is not valid";
        }
    }

    if (validator.isEmpty(mobile)) {
        errors.mobile = "Mobile number is required";
    } else if (!validator.isMobilePhone(mobile)) {
        errors.mobile = "Incorrect mobile number";
    }

    if (validator.isEmpty(postalcode)) {
        errors.postalcode = "Address is required";
    }

    if (validator.isEmpty(injclasscode)) {
        errors.injclasscode = "Injury Classification is required";
    }

    if (validator.isEmpty(driverpassen)) {
        errors.driverpassen = "Claimant is required";
    }

    if (validator.isEmpty(injdescr)) {
        errors.injdescr = "Injury Description is required";
    }

    if (validator.isEmpty(detail)) {
        errors.detail = "Detail is required";
    }

    return {
        isValid: isEmpty(errors),
        errors,
    };
};

const minorValidation = async (post) => {
    let errors = {};
    console.log(post);
    let gfirstname = !isEmpty(post?.gfirstname) ? post?.gfirstname.toString() : "";
    let glastname = !isEmpty(post?.glastname) ? post?.glastname.toString() : "";
    let gdob = !isEmpty(post?.gdob) ? post?.gdob.toString() : "";
    let gpostalcode = !isEmpty(post?.gpostalcode) ? post?.gpostalcode.toString() : "";

    if (validator.isEmpty(gfirstname)) {
        errors.gfirstname = "First name is required";
    } else if (!validator.isLength(gfirstname, { min: 2, max: 50 })) {
        errors.gfirstname = "First name must be between 2 to 50 characters";
    }

    if (validator.isEmpty(glastname)) {
        errors.glastname = "Last name is required";
    } else if (!validator.isLength(glastname, { min: 2, max: 50 })) {
        errors.glastname = "Last name must be between 2 to 50 characters";
    }

    if (validator.isEmpty(gdob)) {
        errors.gdob = "Date of birth is required";
    }

    if (validator.isEmpty(gpostalcode)) {
        errors.gpostalcode = "Address is required";
    }

    return {
        isValid: isEmpty(errors),
        errors,
    };
};

export { validation, passengerValidation, minorValidation };
