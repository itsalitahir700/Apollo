import React, { useState, useEffect, useCallback, useRef } from "react";
import { addNotes, getNotes } from "../../redux/actions/notesAction";
import { useDispatch, useSelector } from "react-redux";
import "./Notes.css";

function Notes() {
    const dispatch = useDispatch();

    const url = require("url");
    const urlObj = url.parse(document.location.href, true);
    const rtaCode = urlObj?.query?.id;

    const messages = useSelector((state) => state.notesSlice?.notes);

    const [note, setnote] = useState("");
    const [firstuser, setfirstuser] = useState("");
    const [sending, setsending] = useState(false);

    const messagesEndRef = useRef(null);

    const handleNotes = useCallback(async () => {
        dispatch(getNotes(rtaCode));
    }, [dispatch, rtaCode]);

    const handleAddNote = async () => {
        if (note) {
            setsending(true);
            await dispatch(addNotes({ note, rtaCode }));
            await handleNotes();
            setnote();
            setsending(false);
        }
    };

    useEffect(() => {
        setfirstuser(messages[0]?.userCode);
    }, [messages]);

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
        handleNotes();
    }, [handleNotes]);
    return (
        <div>
            <section className="chatbox">
                <section className="chat-window">
                    {messages &&
                        messages.length &&
                        sortmessages().map((item, index) =>
                            item?.userCode === firstuser ? (
                                <article key={item?.rtanotecode} className="msg-container msg-self" id="msg-0">
                                    <div className="msg-box">
                                        <div className="flritem?.rtanotecode === 1 ? (">
                                            <div className="messages">
                                                <p className="msg" id="msg-0">
                                                    {item?.note}
                                                </p>
                                            </div>
                                            <span className="timestamp">
                                                <span className="username"></span>&bull;<span className="posttime">{item?.createdon}</span>
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
                                                <span className="username"></span>&bull;<span className="posttime">{item?.createdon}</span>
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
                    <button disabled={sending} onClick={handleAddNote}>
                        <i className={(sending ? "blink" : "") + "pi pi-send"}></i>
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Notes;
