import React from "react";
import { getById } from "../../apis/services/UserService";
import { useParams } from "react-router-dom";

function Account() {
  const { id } = useParams();
  const fetchUserById = async () => {
    const res = await getById(id);
  };
}

export default Account;
