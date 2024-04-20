import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

import { AppSidebarNav } from './AppSidebarNav';

import navigation from '../_nav';
import { set } from '../store/store';
import { RootState } from '../types';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state: RootState) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state: RootState) => state.sidebarShow);

  const toggleSidebar = () => {
    dispatch(set({ sidebarShow: !sidebarShow }));
  };

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(set({ sidebarShow: visible }));
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand>
          <CIcon customClassName="sidebar-brand-full" icon="fa fa-sign-out-alt" height={32} />
          <CIcon customClassName="sidebar-brand-narrow" icon="fa fa-sign-out-alt" height={32} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch(set({ sidebarShow: !sidebarShow }))}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler onClick={toggleSidebar} />
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
