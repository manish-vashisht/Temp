import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_INITIAL_CONTACTS_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect } from "react";
import ChatLIstItem from "./ChatLIstItem";

const List = () => {
  const [
    { userInfo, userContacts, filteredContacts, contactSearch },
    dispatch,
  ] = useStateProvider();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const {
          data: { users, onlineUsers },
        } = await axios(`${GET_INITIAL_CONTACTS_ROUTE}/${userInfo.id}`);
        dispatch({ type: reducerCases.SET_ONLINE_USERS, onlineUsers });
        dispatch({ type: reducerCases.SET_USER_CONTACTS, userContacts: users });
      } catch (error) {
        console.log(error);
      }
    };
    if (userInfo?.id) getContacts();
  }, [userInfo]);
  return (
    <div className="bg-search-input-container-background flex-auto overflow-auto max-h-full custom-scrollbar">
      {contactSearch && contactSearch.length > 0 ? (
        filteredContacts && filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <ChatLIstItem data={contact} key={contact.id} />
          ))
        ) : (
          <p className="text-secondary text-center mt-5">No User Found</p>
        )
      ) : (
        userContacts.map((contact) => (
          <ChatLIstItem data={contact} key={contact.id} />
        ))
      )}
    </div>
  );
};

export default List;
