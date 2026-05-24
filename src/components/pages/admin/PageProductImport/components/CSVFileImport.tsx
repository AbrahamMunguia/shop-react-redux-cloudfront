import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { useInvalidateAvailableProducts } from "~/queries/products";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();
  const invalidateAvailableProducts = useInvalidateAvailableProducts();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    console.log("uploadFile to", url);
    if (!file) return;
    const importURL = "https://w65oxdpuvl.execute-api.us-east-1.amazonaws.com/prod/import";
    const response = await axios.get(importURL, {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("authorization_token")}`,
      },
      params: {
        name: encodeURIComponent(file.name),
      },
    });
    const result = await axios.post(importURL, file, {
      headers: {
        "Content-Type": "text/csv",
        "Authorization": `Bearer ${sessionStorage.getItem("authorization_token")}`,
      },
      params: {
        name: encodeURIComponent(file.name),
      }
    }).finally(async () => {
      await invalidateAvailableProducts();
      setFile(undefined);
    });
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
