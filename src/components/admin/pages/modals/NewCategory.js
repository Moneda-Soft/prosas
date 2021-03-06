import React from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';


import { uiNewCloseModal } from '../../../../actions/ui';
import { useForm } from '../../../../hooks/useForm';
import './modal.css';
import Swal from 'sweetalert2';
import { categoryStartAddNew } from '../../../../actions/category';


Modal.setAppElement('#root');
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

const initFormValue = {
        name: ''
};


export const NewCategory = () => {

    const { newModalOpen } = useSelector(state => state.ui);
    const [formValues, handleFormValues, reset] = useForm(initFormValue);
    const dispatch = useDispatch();
    const { name } = formValues;

    const closeModal = () => {
         reset(); 
         dispatch( uiNewCloseModal() );
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        formValues.lastModified = moment().toDate();

        if(name.length < 3){
            return Swal.fire('Error', 'El campo debe ser mayor a 2 caracteres', 'error');
        }

        dispatch( categoryStartAddNew(formValues) );
        
        closeModal();
    }

    return (<>
        {/* New Category */}
        <Modal
            isOpen={ newModalOpen }
            onRequestClose={ closeModal }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }   
        >
            <h1 className='text-center'>Nueva categoría</h1>
            <hr />
            <p className='text-dark-50 mt-4 mb-5 text-center'>Por favor ingresa los datos requeridos</p>
            <form 
                className="container"
                onSubmit={ handleSubmitForm }
            >
                <div className='form-floating form-outline mb-4'>
                    <input
                        type='text'
                        className='form-control form-control-lg'
                        id='floatingName'
                        placeholder='N'
                    
                        name='name'
                        value={ name }
                        onChange={ handleFormValues }
                    ></input>
                    <label htmlFor='floatingName'>Nombre Categoría</label>
                </div>

                <div className='text-center'>
                    <button
                    type="submit"
                    className="btn btn-outline-secondary"
                    >
                        <i className="far fa-save me-2"></i>
                        <span> Guardar</span>
                    </button>
                </div>
                

            </form>
        </Modal>
    </>)
}
