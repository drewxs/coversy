export const Errors = ({ errors }) => {
  return <>{errors && <p className='error'>{errors}</p>}</>;
};
