import ProductDetails from '@/features/uniform/component/ProductDetails';
import React from 'react';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;

    return (
        <div>
            <ProductDetails productId={id} />
        </div>
    );
}
