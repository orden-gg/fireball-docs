import { NextResponse } from 'next/server';

import { getJuicedSubgraph } from '@/lib/server';

export async function GET() {
  try {
    const juicedSubgraph = getJuicedSubgraph();
    const { items } = await juicedSubgraph.GetItemsLastSale({ first: 1000 });

    return NextResponse.json({
      success: true,
      data: { items },
    });
  } catch (error) {
    console.error('Error fetching items last sale:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching items last sale' },
      { status: 500 },
    );
  }
}
