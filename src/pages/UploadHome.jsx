import React, { useState } from 'react';
import { toast } from 'sonner';
import csvtojson from 'csvtojson';

const UploadHome = () => {
    const [file, setFile] = useState(null);
    const [jsonOutput, setJsonOutput] = useState([]);
    const [state, setState] = useState(true);

    const handleFileChange = (e) => {
        if (e.target.files) {
            console.log(e.target.files);
            setFile(e.target.files[0]);
        }
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.error("No File Found", {
                invert: false,
                duration: 1200
            })
            return;
        } else {
            console.log("File Uploaded");
            toast.success(`File Uploaded`, {
                invert: false,
                duration: 1200
            });
            try {
                const reader = new FileReader();
                reader.onload = async (event) => {
                    const csvData = event.target.result;
                    const jsonObj = await csvtojson().fromString(csvData);
                    setJsonOutput(jsonObj);
                    setState(false); // Change state to false to render the <div>
                };
                reader.readAsText(file);
            } catch (error) {
                console.error(`Error is ${error}`);
            }
            e.target.reset();
        }
    };

    return (
        <>
            <div className='h-full'>
                {state ? (
                    <div className=' flex flex-col gap-6'>
                    <div className=' text-3xl font-bold text-center mt-8 text-red-400'>Upload CSV File Here</div>
                        <form className='h-80 flex flex-col justify-center items-center w-full' onSubmit={handleFileUpload}>
                            <label
                                className="flex flex-col items-center justify-center w-4/5 h-3/4 border-2 border-red-400 border-dotted cursor-pointer"
                            >
                                {!file &&
                                    <span>
                                        Upload File
                                    </span>
                                }
                                <input
                                    size={100}
                                    className="hidden"
                                    type="file"
                                    onChange={handleFileChange}
                                    required
                                />
                                {file && <div>{file && `${file.name} - ${file.type}`}</div>}
                            </label>
                            <button
                                className="mt-8 p-3 px-5 rounded-xl bg-red-200 text-slate-600 transition duration-100 ease-in cursor-pointer hover:bg-slate-600 hover:text-red-200 hover:transition hover:duration-100 hover:ease-out"
                                type="submit"
                            >
                                Upload File
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className=' flex flex-col gap-2 mb-4 justify-center items-center'>
                        <div className='  w-4/5 flex justify-between bg-red-200 mx-8 border rounded-md p-2 gap-4 py-4 mt-4'>
                            <span className=' flex text-xl font-bold w-1/5 justify-start'>Name</span>
                            <span className=' flex text-xl font-bold w-3/5 justify-center'>Courses</span>
                            <span className=' flex text-xl font-bold w-1/5 justify-end'>Status</span>
                        </div>
                        {jsonOutput.map((item, index) => (
                            <div
                                className={` w-4/5 flex justify-between bg-white mx-8 border rounded-md p-2 `}
                                key={index}
                            >
                                <span className=' w-1/5'>{item['User Name']}</span>
                                <span className={`  w-c font-bold ${item['Prompt Design in Vertex AI Completion'] === "1"
                                            ? "text-green-600"
                                            : "text-red-600"
                                        }`}>{item['Prompt Design in Vertex AI Completion']}</span>
                                <span className={`  w-c font-bold ${item['Develop GenAI Apps with Gemini and Streamlit Completion'] === "1"
                                            ? "text-green-600"
                                            : "text-red-600"
                                        }`}>{item['Develop GenAI Apps with Gemini and Streamlit Completion']}</span>
                                <span className={`  w-c font-bold ${item['Gen AI Arcade Game Completion'] === "1"
                                            ? "text-green-600"
                                            : "text-red-600"
                                        }`}>{item['Gen AI Arcade Game Completion']}</span>
                                <span
                                    className={`${item['All 3 Pathways Completed - Yes or No'] === "Yes"
                                            ? "text-green-600"
                                            : "text-red-600"
                                        }`}
                                >{item['All 3 Pathways Completed - Yes or No']}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default UploadHome;
