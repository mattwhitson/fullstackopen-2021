import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { INIT_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);

    const repositories = useQuery(INIT_REPOSITORIES);
    
    setLoading(false);

    setRepositories('fuckyoubutch')
    
  };

  useEffect( async () => {
    await fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;