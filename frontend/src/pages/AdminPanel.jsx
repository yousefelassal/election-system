import { addCandidate } from '../services/candidates';
import { getStats } from '../services/stats';
import useSWR from 'swr';
import { baseUrl } from '../lib/utils';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Button,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Progress
} from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react';
import { useUserStore } from '../stores/user';
import DeleteModal from '../components/DeleteModal';
import EditModal from '../components/UpdateModal';

const addSchema = z.object({
  name: z.string().min(1),
  party: z.string().min(1),
  image: z.string().min(1).nullable()
})

const AdminPanel = () => {
  const addForm = useForm({
    resolver: zodResolver(addSchema)
  });
  const { data, isLoading, mutate } = useSWR(`${baseUrl}/stats`, getStats);
  const { user } = useUserStore();

  const { isOpen:isAddOpen, onOpen: onAddOpen, onOpenChange: onAddOpenChange } = useDisclosure();

  const renderCell = useCallback((candidate, columnKey) => {
    const cellValue = candidate[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{radius: "lg", src: candidate.image}}
            description={candidate.party}
            name={cellValue}
          >
            {candidate.name}
          </User>
        );
      case "votes":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "percentage": 
        return (
          <div className="flex items-center gap-2">
            <span>{cellValue}</span>
            <Progress value={cellValue} size="md" />
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <EditModal id={candidate.id} name={candidate.name} party={candidate.party} image={candidate.image} mutate={mutate} />
            <DeleteModal id={candidate.id} mutate={mutate} />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  
  if(isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col flex-1 w-full h-full items-center justify-center lg:px-32">
        <div className="flex p-4 lg:px-6 flex-col gap-4 w-full rounded-xl h-full bg-white">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-lg">Candidates</h1>
            <Button
              variant="bordered"
              color="primary"
              onClick={onAddOpen}
              startContent={
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                  <path d="M9.5 4.21619V13.7787" stroke="#006FEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.5625 8.99744H4.4375" stroke="#006FEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            >
              Add Candidate
            </Button>
            <Modal isOpen={isAddOpen} onOpenChange={onAddOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader>Add Candidate</ModalHeader>
                    <ModalBody>
                      <form onSubmit={addForm.handleSubmit(async (data) => {
                        const response = await addCandidate(data.name, data.party, data.image, user.token);
                        if (response) {
                          onClose();
                          mutate();
                        }
                      })}>
                        <div className="flex flex-col space-y-4">
                          <Input
                            label="Name"
                            {...addForm.register('name')}
                            error={addForm.formState.errors.name?.message}
                          />
                          <Input
                            label="Party"
                            {...addForm.register('party')}
                            error={addForm.formState.errors.party?.message}
                          />
                          <Input
                            label="Image"
                            {...addForm.register('image')}
                            error={addForm.formState.errors.image?.message}
                          />
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button
                            type="submit"
                            color="primary"
                            isLoading={addForm.formState.isSubmitting}
                            disabled={addForm.formState.isSubmitting}
                          >
                            Add Candidate
                          </Button>
                        </div>
                      </form>
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
          <Table aria-label="Candidates Table">
            <TableHeader columns={[
              { uid: "name", name: "Name" },
              { uid: "votes", name: "Votes" },
              { uid: "percentage", name: "Percentage" },
              { uid: "actions", name: "Actions" }
            ]}>
              {(column) => (
                <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={data || []}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
    </div>
  )
}

export default AdminPanel