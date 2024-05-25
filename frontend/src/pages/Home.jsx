import { getCandidates } from '../services/candidates';
import { voteFor } from '../services/voting';
import useSWR from 'swr';
import { baseUrl } from '../lib/utils';
import { useUserStore } from '../stores/user';
import {
  RadioGroup,
  Radio,
  cn,
  Button,
  Chip
} from "@nextui-org/react";
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios';

const voteSchema = z.object({
  id: z.string().min(1)
})

const CustomRadio = (props) => {
  const {children, ...otherProps} = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "flex w-full m-0 bg-blue-100/80 hover:bg-blue-200/80 transition-colors flex-1 items-center gap-2",
          "max-w-[900px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary w-full"
        ),
      }}
    >
      {children}
    </Radio>
  );
};

CustomRadio.propTypes = {
  children: PropTypes.node
};

const Home = () => {
  const { data, isLoading, mutate } = useSWR(`${baseUrl}/candidates`, getCandidates, {
    refreshInterval: 1000
  });
  const { user } = useUserStore();
  const { data:userInfo, isLoading:isUserInfoLoading, mutate: mutateUserInfo } = useSWR(`${baseUrl}/users/${user.id}`, async () => {
    const response = await axios.get(`${baseUrl}/users/${user.id}`);
    return response.data;
  });
  const form = useForm({
    resolver: zodResolver(voteSchema)
  });

  if (isLoading || isUserInfoLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg p-2 mx-auto h-full py-4">
      <h1 className="font-bold text-lg">Choose your Candidate</h1>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={form.handleSubmit(async (values) => {
          try {
            await voteFor(values.id, user.token);
            mutateUserInfo();
            mutate();
          } catch (error) {
            console.error(error);
          }
        })}
      >
        <RadioGroup className="w-full" name="id" onValueChange={(value) => form.setValue("id", value)}>
          {data.map((candidate) => (
            <CustomRadio className="w-full" key={candidate.id} value={candidate.id}>
              <div className="flex flex-1 items-center w-full justify-between gap-12 lg:gap-36">
                <div className="flex items-center gap-2">
                  <img
                    className="w-10 h-10 rounded-xl"
                    src={candidate.image}
                    alt={candidate.name}
                    />
                  <span className="text-lg">{candidate.name}</span>
                </div>
                <Chip className="">{candidate.party}</Chip>
              </div>
            </CustomRadio>
          ))}
        </RadioGroup>
        {userInfo.votedFor ? (
          <div className="flex items-center gap-2">
            <span className="font-bold">You have voted for:</span>
            <Chip>{userInfo.votedFor.name}</Chip>
          </div>
        ) : (
        <Button
          type="submit"
          color="primary"
          className="w-fit flex px-12 self-end"
          disabled={userInfo.votedFor ? true : false}
          isLoading={form.formState.isSubmitting}
        >
          Vote
        </Button>
        )}
      </form>
    </div>
  )
}

export default Home