import React from 'react';
import CompaniesTable from './Clients';
import { StyledAdminTables } from './Style';
import { Tabs } from 'antd';
import ChamadosTable from './Called';
import IndicationsTable from './Indications';

export default function AdminMaster() {

    const tabList = [
        {
            key: '1',
            tab: 'Controle de Acesso',
            content: (
                <>
                    <CompaniesTable />
                </>
            )
        },
        {
            key: '2',
            tab: 'Chamados',
            content: (
                <>
                    <ChamadosTable />
                </>
            )
        },
        {
            key: '3',
            tab: 'Indicações',
            content: (
                <>
                    <IndicationsTable />
                </>
            )
        }
    ]


    return (
        <StyledAdminTables>
            <Tabs defaultActiveKey='1'>
                {tabList.map(tab => (
                    <Tabs.TabPane tab={tab.tab} key={tab.key}>
                        {tab.content}
                    </Tabs.TabPane>
                ))}
            </Tabs>
        </StyledAdminTables>
    )
}