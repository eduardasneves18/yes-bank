import React from "react";
import "./fields.css";
import { useState } from 'react';

interface FieldProps {
    id: string;
    className?: string;
    labelDescription: string;
    placeholderText?: string;
    value?: string | number;
    onChange?: (event: React.ChangeEvent<any>) => void;
}

interface LookupFieldProps extends FieldProps {
    options: string[];
}


function AttachmentField() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadStatus, setUploadStatus] = useState('');
  
    const handleFileChange = (e) => {
      setSelectedFiles(e.target.files);
    };
  
    const handleUpload = async () => {
      if (selectedFiles.length === 0) {
        alert('Por favor, selecione pelo menos um arquivo.');
        return;
      }
  
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('file', selectedFiles[i]);
      }
  
      setUploadStatus('Enviando...');
  
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const data = await response.json();
          setUploadStatus(`Upload concluído: ${data.uploadedFiles.join(', ')}`);
        } else {
          const error = await response.json().catch(() => ({
            error: 'Erro desconhecido no backend.',
          }));
          setUploadStatus(`Erro no upload: ${error.error}`);
        }
      } catch (error) {
        console.error('Erro ao conectar ao servidor:', error);
        setUploadStatus('Erro ao conectar ao servidor.');
      }
    };
  
    return (
      <div>
        <label>Upload de Arquivos</label>
        <input type="file" multiple onChange={handleFileChange} />
        <button onClick={handleUpload}>Enviar</button>
        <p>{uploadStatus}</p>
      </div>
    );
  }
  
const LookupField: React.FC<LookupFieldProps> = ({ id, value, className, labelDescription, options, onChange }) => (
    <div className={`fields ${className}`}>
        <label htmlFor={id}>{labelDescription}</label>
        <select id={id} className="select" value={value} onChange={onChange}>
            {options.map((option, index) => (
                <option key={index} value={option} style={{ color: 'black' }}>
                    {option}
                </option>
            ))}
        </select>
    </div>
);

const TextField: React.FC<FieldProps> = ({ id, className, labelDescription, placeholderText, value, onChange }) => (
    <div className={`fields ${className}`}>
        <label htmlFor={id}>{labelDescription}</label>
        <input type="text" id={id} className="input" placeholder={placeholderText} value={value} onChange={onChange} />
    </div>
);

const NumberField: React.FC<FieldProps> = ({ id, className, value=0.00 ,labelDescription, placeholderText, onChange }) => (
    <div className={`fields ${className}`}>
        <label htmlFor={id}>{labelDescription}</label>
        <input type="number" id={id} name="valor" value={value} min="1.00" step="1.00" className="input" placeholder={placeholderText} onChange={onChange} />
    </div>
);

const PasswordField: React.FC<FieldProps> = ({ id, className, labelDescription, placeholderText, value, onChange }) => (
  <div className={`fields ${className}`}>
      <label htmlFor={id}>{labelDescription}</label>
      <input type="password" id={id} className="input" placeholder={placeholderText} value={value} onChange={onChange} />
  </div>
);

const EmailField: React.FC<FieldProps> = ({ id, className, labelDescription, placeholderText, value, onChange }) => (
  <div className={`fields ${className}`}>
      <label htmlFor={id}>{labelDescription}</label>
      <input type="email" id={id} className="input" placeholder={placeholderText} value={value} onChange={onChange} />
  </div>
);

const DateField: React.FC<FieldProps> = ({ id, className, labelDescription, placeholderText, onChange }) => (
    <div className={`fields ${className}`}>
        <label htmlFor={id}>{labelDescription}</label>
        <input type="date" id={id} name="data" className="input" placeholder={placeholderText} onChange={onChange} />
    </div>
);


export { LookupField, TextField, NumberField, DateField, AttachmentField, PasswordField, EmailField };
