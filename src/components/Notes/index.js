import React, { useState, useEffect, useCallback, useRef } from "react";
import { addNotes, getNotes } from "../../redux/actions/notesAction";
import { useDispatch, useSelector } from "react-redux";
import "./Notes.css";
import { getLovUserCategory } from "../../services/Lovs";

function Notes() {
    const dispatch = useDispatch();

    const url = require("url");
    const urlObj = url.parse(document.location.href, true);
    const rtaCode = urlObj?.query?.id;

    const messages = useSelector((state) => state.notesSlice?.notes);

    const [note, setnote] = useState("");
    const [sending, setsending] = useState(false);
    const [usersLov, setUsersLov] = useState([]);
    const [selectedUser, setSelectedUser] = useState();

    const messagesEndRef = useRef(null);

    const handleNotes = useCallback(async () => {
        await dispatch(getNotes(rtaCode));
    }, [dispatch, rtaCode]);

    const handleAddNote = async () => {
        if (note) {
            setsending(true);
            await dispatch(addNotes({ note, rtaCode, userCatCode: selectedUser }));
            await handleNotes();
            setnote();
            setsending(false);
        }
    };

    const handleUserLov = async () => {
        let userList= await getLovUserCategory()
        const  loggedIn=  JSON.parse(localStorage.getItem("loggedIn")).tblUsercategory.categorycode;
        console.log(userList)
        switch (Number(loggedIn)) {
            case 1 : userList=  userList.filter((item)=> (item.code==="4"))
            break;
            case 2 : 
            userList=  userList.filter((item)=> (item.code==="4"))
            break;
            case 4:
             userList=  userList.filter((item)=> (item.code!=="4" && item.code!=="3"))
                break;
            default:
                userList=  userList.filter((item)=> (item.code==="4"))
                break;
        }
        setUsersLov(userList);
    };

    const sortmessages = () => {
        return (
            messages.length &&
            [...messages].sort((a, b) => {
                return a.rtanotecode - b.rtanotecode;
            })
        );
    };

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        handleUserLov();
        handleNotes();
    }, [handleNotes]);
    return (
        <div>
            <section className="chatbox">
                <section className="chat-window">
                    {messages &&
                        messages.length &&
                        sortmessages().map((item, index) =>
                            item?.self ? (
                                <article key={item?.rtanotecode} className="msg-container msg-self" id="msg-0">
                                    <div className="msg-box">
                                        <div className="flritem?.rtanotecode === 1 ? (">
                                            <div className="messages">
                                                <p className="msg" id="msg-0">
                                                    {item?.note}
                                                </p>
                                            </div>
                                            <span className="timestamp">
                                                <span className="username">{item?.userName}</span>&bull;<span className="posttime">{item?.createdon}</span>
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            ) : (
                                <article key={item?.rtanotecode} className="msg-container msg-remote" id="msg-1">
                                    <div className="msg-box">
                                        <div className="flr">
                                            <div className="messages">
                                                <p className="msg" id="msg-1">
                                                    {item?.note}
                                                </p>
                                            </div>
                                            <span className="timestamp">
                                                <span className="username">{item?.userName}</span>&bull;<span className="posttime">{item?.createdon}</span>
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            )
                        )}

                    <div ref={messagesEndRef} />
                </section>
                <div className="chat-input">
                    <input type="text" disabled={sending} autoComplete="true" value={note || ""} onChange={(e) => setnote(e.target.value)} placeholder="Type a message" />
                    <div>
                        <select value={selectedUser || (usersLov && usersLov.length && usersLov[0]?.code)} onChange={(e) => setSelectedUser(e.target.value)}>
                            {usersLov &&
                                usersLov.map((user) => (
                                    <option value={user?.code} key={user?.code}>
                                        {user?.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <button disabled={sending} onClick={handleAddNote}>
                        <i className={sending ? "pi pi-spin pi-spinner" : "pi pi-send "}></i>
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Notes;
