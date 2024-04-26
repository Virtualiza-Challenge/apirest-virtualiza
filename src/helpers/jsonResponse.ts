interface Props {
  count?: number;
  result?: any;
  error?: boolean;
  message?: any;
}

export const jsonResponse = ({
  count = 0,
  result = null,
  error = false,
  message = "",
}: Props) => {
  return {
    count,
    result,
    error,
    message,
  };
};
