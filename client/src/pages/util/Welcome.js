import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Errors } from 'components';
import { ConfirmUser } from 'redux/verification';

export const Welcome = (props) => {
    const success = useSelector((state) => state.verification.success);
    const errors = useSelector((state) => state.verification.errors);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        ConfirmUser(searchParams.get('code'));
    }, [searchParams]);

    return (
        <section className='dashboard'>
            <div className='container'>
                {success ? (
                    <>
                        <h1>Account Verified!</h1>
                        <Link to={'/login'}>Please Login</Link>
                    </>
                ) : (
                    <>
                        <h1>Error</h1>
                        <Errors errors={errors} />
                        <br />
                        <Link to={'/login'}>Please Login</Link>
                    </>
                )}
            </div>
        </section>
    );
};
