import * as XLSX from 'xlsx';
import React, { useState } from 'react';
import { insertMatches } from '../../services/play_match.js';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; 

const ExcelComponent = () => {    
    const [file, setFile] = useState(null);
    const [excelData, setExcelData] = useState([]);
    const navigate = useNavigate();
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleFileUpload = async(e) =>  {
         e.preventDefault();
        if (file) {
            try {
                const fileReader = new FileReader();
                fileReader.onload = async (e) => {
                    const data = e.target.result;
                    const excel = XLSX.read(data, { type: 'binary' });
                    const sheetName = excel.SheetNames[0];
                    const sheet = excel.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 0 });
                    const token = localStorage.getItem("token");
                    const list = await insertMatches(token, jsonData);             
                    if(list.length > 0){
                        navigate("/admin");
                    }
                    else{
                        alert("Error al cargar el archivo");
                    }
                    setExcelData(jsonData);
                    console.log(excelData);
                };
                fileReader.readAsBinaryString(file);
            } catch (error) {
                console.error("Error leyendo el archivo");
            }
        } else {
            alert('No has seleccionado un archivo');
        }
    };

    return (
        <div className='container mt-5'>
        <FaArrowLeft 
            onClick={() => navigate(-1)} 
            style={{ cursor: 'pointer', fontSize: '24px' }} 
        />
        <form className='form mx-auto w-50' onSubmit={handleFileUpload}>
            <input type="file" onChange={handleFileChange} className='form-control' accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
            <button className='btn btn-success mt-3'>Subir archivo</button>
        </form>
        </div> 
    );
};

export default ExcelComponent;