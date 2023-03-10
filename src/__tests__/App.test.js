import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from '../App';

jest.mock('axios');

describe('App', () => {
  it('renders the token image', async () => {
    const responseData = { uri1024: 'https://example.com/token-image.jpg' };
    axios.get.mockResolvedValueOnce({ data: responseData });

    render(<App />);
    const imageElement = await screen.findByAltText('Token');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.getAttribute('src')).toBe(responseData.uri1024);
  });

  it('displays the zoomed image when the token image is clicked', async () => {
    const responseData = { uri1024: 'https://example.com/token-image.jpg' };
    axios.get.mockResolvedValueOnce({ data: responseData });

    render(<App />);
    const imageElement = await screen.findByAltText('Token');
    fireEvent.click(imageElement);

    await waitFor(() => {
      const zoomedElement = screen.getByAltText('Zoomed Token');
      expect(zoomedElement).toBeInTheDocument();
      expect(zoomedElement.getAttribute('src')).toBe(responseData.uri1024);
    });
  });

  it('hides the zoomed image when it is clicked', async () => {
    const responseData = { uri1024: 'https://example.com/token-image.jpg' };
    axios.get.mockResolvedValueOnce({ data: responseData });

    render(<App />);
    const imageElement = await screen.findByAltText('Token');
    fireEvent.click(imageElement);

    await waitFor(() => {
      const zoomedElement = screen.getByAltText('Zoomed Token');
      fireEvent.click(zoomedElement);
      expect(zoomedElement).not.toBeInTheDocument();
    });
  });
});
