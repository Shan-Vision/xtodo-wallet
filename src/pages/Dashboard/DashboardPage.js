import Currency from 'components/Currency/Currency';
import { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import ModalAddTransaction from 'components/ModalAddTransaction';
import IconButton from 'components/IconButton';
import { PlusOutlined } from '@ant-design/icons';
import { Outlet, useLocation } from 'react-router-dom';
import TransactionsTable from 'components/TransactionsTable/TransactionsTable';
import Balance from 'components/Balance';
import Navigation from 'components/Navigation';
import { DashboardWrapper, DashbordBlur, DashboardLaptopWrapper, DashboardTabletWrapper, WrapperBase } from './Dashboard.styled';
import Media from 'react-media';
import { DiagramTab } from 'components/DiagramTab/DiagramTab';

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  console.log(location);
  return (
    <DashbordBlur>
      {location.pathname === '/dashboard' && (
        <DashboardWrapper>
          <Helmet>
            <title>Dashboard</title>
          </Helmet>
          <DashboardLaptopWrapper>
            <DashboardTabletWrapper>
              <WrapperBase>
                <Navigation />
                <Balance />
              </WrapperBase>
              <Media query="(min-width: 768px)" render={() => <Currency />} />
            </DashboardTabletWrapper>
          </DashboardLaptopWrapper>
          <TransactionsTable />
          <DiagramTab />
          <IconButton onClick={() => setIsModalOpen(true)}>
            <PlusOutlined style={{ fontSize: '20px' }} />
          </IconButton>
          {isModalOpen && (
            <ModalAddTransaction onClose={() => setIsModalOpen(false)} />
          )}
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </DashboardWrapper>
      )}
      {location.pathname === '/statistic' && (
        <DashboardWrapper>
          <Helmet>
            <title>Statistic</title>
          </Helmet>
          <DashboardLaptopWrapper>
            <DashboardTabletWrapper>
              <WrapperBase>
                <Navigation />
                <Media query="(min-width: 768px)" render={() => <Balance />} />
              </WrapperBase>
              <Media query="(min-width: 768px)" render={() => <Currency />} />
            </DashboardTabletWrapper>
          </DashboardLaptopWrapper>
          <>
            <h3>THIS IS STATISTIC PAGE</h3>
            {/* <StatisticPage /> */}
          </>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </DashboardWrapper>
      )}
    </DashbordBlur>
  );
};

export default DashboardPage;