import React, { useState } from "react";
import "./Notes.css";

function Notes() {
    const [messages] = useState([
        { message: "Hello there", date: "2020/01/01", id: 1 },
        { message: "Hello there", date: "2020/01/01", id: 2 },
        { message: "How you doing", date: "2020/01/02", id: 1 },
    ]);
    return (
        <div>
            <section className="chatbox">
                <section className="chat-window">
                    {messages.map((item, index) =>
                        item?.id === 1 ? (
                            <article className="msg-container msg-remote" id="msg-0">
                                <div className="msg-box">
                                    <div className="flr">
                                        <div className="messages">
                                            <p className="msg" id="msg-0">
                                                {item?.message}
                                            </p>
                                        </div>
                                        <span className="timestamp">
                                            <span className="username">Name</span>&bull;<span className="posttime">{item?.date}</span>
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ) : (
                            <article className="msg-container msg-self" id="msg-0">
                                <div className="msg-box">
                                    <div className="flr">
                                        <div className="messages">
                                            <p className="msg" id="msg-1">
                                                {item?.message}
                                            </p>
                                        </div>
                                        <span className="timestamp">
                                            <span className="username">Name</span>&bull;<span className="posttime">{item?.date}</span>
                                        </span>
                                    </div>
                                </div>
                            </article>
                        )
                    )}
                </section>
                <div className="chat-input">
                    <input type="text" autoComplete="true" placeholder="Type a message" />
                    <button>
                        <i className="pi pi-send"></i>
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Notes;
