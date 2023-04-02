"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Bungee_Inline } from "next/font/google";

export default function ResumeUploader() {

    const [ isDisabled, setIsDisabled ] = useState(false);
    const [ file, setFile ] = useState<File | null>(null);

    const fileSelectedHandler = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            setFile(e.currentTarget.files[0]);
            if (e.currentTarget.files[0].type != "application/pdf") {
                toast.error("Please upload a PDF file");
                // Set submit to disabled
                setIsDisabled(true);
            } else {
              setIsDisabled(false);
            }
        }
    };

    const uploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file || file.type != "application/pdf") {
            toast.error("Please upload a PDF file");
            return;
        } else {
            const safeFileName = file.name.replace(/[\[\]\(\)']+/g,'');
            console.log(safeFileName);

            let { data } = await axios.post('/api/addPDF', {
                name: safeFileName,
                type: file.type,
            });

            const url = data.url;
            console.log(url);

            const formData = new FormData();
            formData.append("file", file);

            await axios.put(url, formData, {
              headers: {
                "Content-Type": file.type,
                "Content-Disposition": "inline",
                "Access-Control-Allow-Origin": "*",
              },
            })

            setIsDisabled(false);
        }
    };

    return (
        <form className="text-amber-700" onSubmit={(e) => uploadFile(e)}>
            <input
            type="file"
            accept=".pdf"
            onChange={(e) => fileSelectedHandler(e)}
            // value = {file ?? ''}
            ></input>
            <button disabled={isDisabled} type='submit'>Upload</button>
        </form>
        
    );
}
