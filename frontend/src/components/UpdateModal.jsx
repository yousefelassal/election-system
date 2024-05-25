
import { EditIcon } from '../components/icons';
import { useUserStore } from '../stores/user';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input
  } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import { updateCandidate } from '../services/candidates';
import PropTypes from 'prop-types';

const EditModal = ({ id, name, party, image, mutate }) => {
  const { isOpen:isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure();
  const EditForm = useForm();
  const { user } = useUserStore();
  return (
    <>
        <button onClick={onEditOpen} className="text-lg z-10 active:opacity-50">
            <EditIcon />
        </button>
            <Modal isOpen={isEditOpen} onOpenChange={onEditOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                  <ModalHeader>
                    Update Candidate
                  </ModalHeader>
                  <ModalBody className="flex flex-col gap-4 p-4">
                    <Input
                      label="Name"
                      placeholder="Name"
                      {...EditForm.register('name', { required: true })}
                      defaultValue={name}
                    />
                    <Input
                      label="Party"
                      placeholder="Party"
                      {...EditForm.register('party', { required: true })}
                      defaultValue={party}
                    />
                    <Input
                      label="Image"
                      placeholder="Image"
                      {...EditForm.register('image', { required: true })}
                      defaultValue={image}
                    />
                  </ModalBody>
                  <ModalFooter className="flex justify-end gap-4">
                    <Button
                      color="default"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      isLoading={EditForm.formState.isSubmitting}
                      disabled={EditForm.formState.isSubmitting}
                      onClick={EditForm.handleSubmit(async () => {
                        const response = await updateCandidate(id,
                            EditForm.getValues('name'),
                            EditForm.getValues('party'),
                            EditForm.getValues('image'),
                            user.token);
                        if (response) {
                          onClose();
                          mutate();
                        }
                      })}
                    >
                      Edit
                    </Button>
                  </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
        </>
  )
}

EditModal.propTypes = {
    id: PropTypes.string.isRequired,
    mutate: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    party: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
};

export default EditModal