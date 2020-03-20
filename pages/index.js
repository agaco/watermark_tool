import React from 'react';

import Editor from '../components/editor';

import './index.scss';

const Home = () => {
    return (
        <main className='pt-main'>
            <section className='pt-main__content'>
                <Editor/>
            </section>
        </main>
    );
};

export default Home;
