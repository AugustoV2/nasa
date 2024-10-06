import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

const API_KEY = '03c48dae07364cabb7f121d8c1519492'; // Replace with your actual API key

export async function POST(req: NextRequest) {
    if (req.method === 'POST') {
        if (!req.body) {
            return { status: 400, json: { error: 'Location is required' } };
        }

        const b = await req.json();
        const { location } = b;

        console.log('Received location:', location);

        if (!location) {
            return { status: 400, json: { error: 'Location is required' } };
        }
        console.log('Received location:', location);    
        // Fetch coordinates from OpenCage API
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${API_KEY}&no_annotations=1&language=en`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const coordinates = data.results[0].geometry;
                console.log('Coordinates:', coordinates);
                return NextResponse.json({ location, coordinates });
            } else {
                return { status: 404, json: { error: 'Location not found' } };
            }
        } catch (error) {
            console.error('Error fetching data from OpenCage API:', error);
            return { status: 500, json: { error: 'Internal Server Error' } };
        }
    } else {
        console.log('Received location:', location);
        return { status: 405, json: { error: `Method ${req.method} Not Allowed` } };
    }
}
