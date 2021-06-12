import React, { useState, useEffect, useCallback } from "react";
import { getMessages } from "../../redux/actions/messagesAction";
import { useDispatch, useSelector } from "react-redux";
import MessagesTable from "../MessagesTable";

function Messages() {
    const dispatch = useDispatch();

    const url = require("url");
    const urlObj = url.parse(document.location.href, true);
    const rtaCode = urlObj?.query?.id;

    const messages = useSelector((state) => state.messagesSlice?.messages);

    const handleMessages = useCallback(async () => {
        dispatch(getMessages(rtaCode));
    }, [dispatch, rtaCode]);

    useEffect(() => {
        handleMessages();
    }, [handleMessages]);

    return <MessagesTable messages={messages} loading={false} />;
}

export default Messages;
