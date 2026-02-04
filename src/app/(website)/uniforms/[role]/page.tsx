import RoleProductList from '@/features/uniform/component/RoleProductList';
import React from 'react';

interface PageProps {
    params: Promise<{
        role: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { role } = await params;
    const decodedRole = decodeURIComponent(role);

    return (
        <div>
            <RoleProductList role={decodedRole} />
        </div>
    );
}
