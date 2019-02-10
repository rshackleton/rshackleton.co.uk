import React from 'react';

import Layout from '@components/layouts/Default';
import SEO from '@components/shared/SEO';

const NotFoundPage = () => (
  <Layout>
    <SEO title="Page Not Found" description="" keywords="" />
    <div>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </Layout>
);

export default NotFoundPage;
