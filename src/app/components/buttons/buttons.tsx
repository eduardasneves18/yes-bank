import "./buttons.css";
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { updateTransactionsAPI, deleteTransactionsAPI } from '@/app/services/transaction';
import { LookupField, NumberField, TextField } from "../fields/fields";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

type Transaction = {
    id: number;
    description: string;
    amount: number;
    type: string;
};

interface EditTransactionProps {
    transaction: Transaction;
    className?: string;
    onUpdate: () => void;
}

interface DefaultProps {
    className?: string;
    title: string;
    action: MouseEventHandler;
}

const InsertTransactionButton: React.FC<DefaultProps> = ({ className, title, action }) => (
    <div className={className}>
        <button className="primary" onClick={action}>
            {title}
        </button>
    </div>
);

const EditTransactionScreen: React.FC<EditTransactionProps> = ({ className, transaction, onUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [description, setDescription] = useState<string>(transaction.description);
    const [amount, setAmount] = useState<number>(transaction.amount);
    const [type, setType] = useState<string>(transaction.type);

    useEffect(() => {
        if (transaction) {
            setDescription(transaction.description);
            setAmount(transaction.amount);
            setType(transaction.type);
        }
    }, [transaction]);

    const handleButtonClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleUpdate = async () => {
        const updatedData = { description, amount, type };
        await updateTransactionsAPI(transaction.id, updatedData);
        onUpdate();
        closeModal();
    };

    return (
        <div className={className}>
            <button className="icon-button" onClick={handleButtonClick}>
                <FontAwesomeIcon icon={faPen} />
            </button>

            {isModalOpen && (
                <div className="edit-modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h3>Transaction Details</h3>
                        <div>
                            <TextField 
                                id="destinatario"
                                className="text-field"
                                labelDescription="Destinatário"
                                placeholderText="Insira o nome do destinatário"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} 
                            />
                        </div>
                        <div className="edit-fields-line">
                            <NumberField 
                                id="valor"
                                className="number-field"
                                labelDescription="Valor"
                                placeholderText="00,00"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                            />
                            <LookupField 
                                id="tipo-transacao"
                                className="lookup-field"
                                labelDescription="Tipo de transação"
                                options={["PIX", "TED"]}
                                placeholderText="Selecione o tipo de transação"
                                value={type}
                                onChange={(e) => setType(e.target.value)} 
                            />
                        </div>
                        <div className="update-button">
                            <button className="primary" onClick={handleUpdate}>
                                Atualizar transação
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const DeleteTransaction: React.FC<{ className?: string; transaction: Transaction; onDelete: () => void; }> = ({ className, transaction, onDelete }) => {
    const handleDelete = async () => {
        await deleteTransactionsAPI(transaction.id);
        onDelete();
    };

    return (
        <div className={className}>
            <button 
                className="icon-button" 
                onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    );
};

export { InsertTransactionButton, EditTransactionScreen, DeleteTransaction };

