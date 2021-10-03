import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/queries";

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ input }) => {
    mutate({variables: {input}});
  };

  console.log(result)
  return [signIn, result];
};

export default useSignIn