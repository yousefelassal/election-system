
import { DeleteIcon } from '../components/icons';
import { useUserStore } from '../stores/user';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
  } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import { deleteCandidate } from '../services/candidates';
import PropTypes from 'prop-types';

const DeleteModal = ({ id, mutate }) => {
  const { isOpen:isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange } = useDisclosure();
  const deleteForm = useForm();
  const { user } = useUserStore();
  return (
    <>
    <button onClick={onDeleteOpen} className="text-lg z-10 text-danger active:opacity-50">
            <DeleteIcon />
            </button>
            <Modal isOpen={isDeleteOpen} onOpenChange={onDeleteOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                  <ModalHeader>
                    Delete Candidate
                  </ModalHeader>
                  <ModalBody className="flex flex-col gap-4 p-4">
                    <p>Are you sure you want to delete this candidate?</p>
                  </ModalBody>
                  <ModalFooter className="flex justify-end gap-4">
                    <Button
                      color="default"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="danger"
                      isLoading={deleteForm.formState.isSubmitting}
                      disabled={deleteForm.formState.isSubmitting}
                      onClick={deleteForm.handleSubmit(async () => {
                        const response = await deleteCandidate(id, user.token);
                        if (response) {
                          onClose();
                          mutate();
                        }
                      })}
                    >
                      Delete
                    </Button>
                  </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
        </>
  )
}

DeleteModal.propTypes = {
    id: PropTypes.string.isRequired,
    mutate: PropTypes.func.isRequired,
};

export default DeleteModal