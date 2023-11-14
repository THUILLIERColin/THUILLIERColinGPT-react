import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';

interface Conversation {
  id: string;
  firstMessage: string;
  userId: number;
}

interface Conversations {
  conversations: Conversation[];
}

interface LeftbarProps {
  conversationId?: string;
}

export default function Leftbar({ conversationId }: LeftbarProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { token } = useContext(UserContext);

  useEffect(() => {
    var myHeaders = new Headers();
    if (token) {
      myHeaders.append('Authorization', 'Bearer ' + token);
    }

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch('http://localhost:3000/api/conversations', requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Une erreur est survenue');
        }
        return response.json();
      })
      .then((result) => setConversations(result))
      .catch((error) => setError(error));

    setIsLoading(false);
  }, [token]);

  return (
    <nav className="flex flex-col bg-gray-100 dark:bg-gray-900 w-[260px] overflow-y-auto">
      <h1 className="text-2xl font-bold p-4">
        <Link href="/">mewoGPT</Link>
      </h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {!isLoading && !error && (
        <>
          <ul>
            {conversations?.[0] &&
              conversations.map((conversation) => (
                <li key={conversation?.id}>
                  {conversation?.id == conversationId && (
                    <Link
                      key={conversation?.id}
                      className="flex p-3 items-center gap-3 rounded-md break-all pr-14 text-blue-500"
                      href={`/conversations/${conversation?.id}`}
                    >
                      {conversation?.firstMessage}
                    </Link>
                  )}

                  {conversation?.id != conversationId && (
                    <Link
                      key={conversation?.id}
                      className="flex p-3 items-center gap-3 rounded-md break-all pr-14"
                      href={`/conversations/${conversation?.id}`}
                    >
                      {conversation?.firstMessage}
                    </Link>
                  )}
                </li>
              ))}
          </ul>
          <div className="flex-1"></div>
          <div className="p-4">
            {token ? (
              <Link href="/auth/logout">Logout</Link>
            ) : (
              <>
                <Link href="/auth/login">Login</Link>
                <span className="mx-2">/</span>
                <Link href="/auth/signup">Signup</Link>
              </>
            )}
          </div>
        </>
      )}
    </nav>
  );
}
