import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    const [formState, setFormState] = React.useState({});
    const onChange = (e) => {
        const { id, value } = e.target;
        setFormState({ ...formState, [id]: value });
    };

    const handleSubmit = () => {
        handleValidation();
    };

    const isEmpty = (value) => value === undefined || value === null || (typeof value === "object" && Object.keys(value).length === 0) || (typeof value === "string" && value.trim().length === 0);

    const handleValidation = () => {
        let documentName = !isEmpty(formState?.documentName) ? formState?.documentName.toString() : "";
        let documentType = !isEmpty(formState?.documentType) ? formState?.documentType.toString() : "";
        let category = !isEmpty(formState?.category) ? formState?.category.toString() : "";
        let email = !isEmpty(formState?.email) ? formState?.email.toString() : "";

        let errors = {};
        if (documentName === "") {
            errors.documentName = "Document name is required";
        } else if (documentName.length < 2 || documentName.length > 32) {
            errors.documentName = "Document name must be between 2 to 50 characters";
        }

        if (documentType === "") {
            errors.documentType = "Document type is required";
        }

        if (category === "") {
            errors.documentType = "Category is required";
        }

        if (email === "") {
            errors.documentType = "Email is required";
        }

        console.log(errors);
    };

    console.log("FORM::", formState);
    return (
        <div className="container">
            <div className="form-group">
                <label>Document Name</label>
                <input onChange={onChange} type="text" id="documentName" className="form-control" />
                <label>Document Type</label>
                <select id="documentType" onChange={onChange} className="form-control">
                    <option value="Plain">Plain</option>
                    <option value="PDF">PDF</option>
                </select>
                <label>Category</label>
                <select id="category" onChange={onChange} className="form-control">
                    <option value="Audit">Audit</option>
                    <option value="Application">Application</option>
                    <option value="Other">Other</option>
                </select>
                <label>Email</label>
                <input type="text" id="email" onChange={onChange} className="form-control" />
                <div className="center-block text-center mt-4">
                    <input type="submit" onClick={handleSubmit} className="btn btn-primary" />
                </div>
            </div>
        </div>
    );
};
ReactDOM.render(<App />, document.getElementById("app"));
