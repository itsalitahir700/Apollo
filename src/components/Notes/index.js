import React from "react";
import "./Notes.css";

function Notes() {
    return (
        <div>
            <section className="chatbox">
                <section className="chat-window">
                    <article className="msg-container msg-remote" id="msg-0">
                        <div className="msg-box">
                            <div className="flr">
                                <div className="messages">
                                    <p className="msg" id="msg-0">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent varius, neque non tristique tincidunt, mauris nunc efficitur erat, elementum semper justo odio id nisi.
                                    </p>
                                </div>
                                <span className="timestamp">
                                    <span className="username">Name</span>&bull;<span className="posttime">3 minutes ago</span>
                                </span>
                            </div>
                        </div>
                    </article>
                    <article className="msg-container msg-self" id="msg-0">
                        <div className="msg-box">
                            <div className="flr">
                                <div className="messages">
                                    <p className="msg" id="msg-1">
                                        Lorem ipsum dolor sit amet
                                    </p>
                                    <p className="msg" id="msg-2">
                                        Praesent varius
                                    </p>
                                </div>
                                <span className="timestamp">
                                    <span className="username">Name</span>&bull;<span className="posttime">2 minutes ago</span>
                                </span>
                            </div>
                        </div>
                    </article>
                    <article className="msg-container msg-remote" id="msg-0">
                        <div className="msg-box">
                            <div className="flr">
                                <div className="messages">
                                    <p className="msg" id="msg-0">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </p>
                                </div>
                                <span className="timestamp">
                                    <span className="username">Name</span>&bull;<span className="posttime">1 minute ago</span>
                                </span>
                            </div>
                        </div>
                    </article>
                    <article className="msg-container msg-remote" id="msg-0">
                        <div className="msg-box">
                            <div className="flr">
                                <div className="messages">
                                    <p className="msg" id="msg-0">
                                        Lorem ipsum dolor sit amet.
                                    </p>
                                </div>
                                <span className="timestamp">
                                    <span className="username">Name</span>&bull;<span className="posttime">Now</span>
                                </span>
                            </div>
                        </div>
                    </article>
                    <article className="msg-container msg-self" id="msg-0">
                        <div className="msg-box">
                            <div className="flr">
                                <div className="messages">
                                    <p className="msg" id="msg-1">
                                        Lorem ipsum
                                    </p>
                                </div>
                                <span className="timestamp">
                                    <span className="username">Name</span>&bull;<span className="posttime">Now</span>
                                </span>
                            </div>
                        </div>
                    </article>
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
