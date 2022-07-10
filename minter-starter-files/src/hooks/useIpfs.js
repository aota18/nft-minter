import React, { useEffect, useState } from "react";
import { create } from "ipfs-http-client";

export const useIpfs = () => {
  /* Infura IPFS config */
  const projectId = "2BFYKhVDJdY4cE2Id7gZbDL5atn";
  const projectSecret = "ac3c1ceda12692fe06ba9e31b44c2ce2";
  const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

  const [ipfs, setIpfs] = useState(null);

  useEffect(() => {
    try {
      const ipfs = create({
        url: "https://ipfs.infura.io:5001/api/v0",
        headers: {
          authorization,
        },
      });
      setIpfs(ipfs);
    } catch (error) {
      console.error("IPFS error ", error);
    }
  }, []);

  return { ipfs };
};
