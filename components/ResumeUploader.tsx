'use client'

import { toast } from "react-hot-toast";

export default function ResumeUploader() {

  const fileSelectedHandler = (e:React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
        console.log(e.currentTarget.files[0]);
        if (e.currentTarget.files[0].type != 'application/pdf') {
            toast.error('Please upload a PDF file');
            // Set submit to disabled
        }
    }
  }

  return (
      <input type="file" accept='.pdf' onChange={e => fileSelectedHandler(e)}></input>
  );  
}
