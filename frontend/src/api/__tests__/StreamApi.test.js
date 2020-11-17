import React from 'react'
import axios from 'axios'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() });

import StreamsTable from '../../streamlist/StreamsTable'
// import StreamApi itself
import * as StreamApi from '../StreamApi'
import * as SampleData from '../SampleData'

jest.mock('axios');

const mockSingleStream = {
    streamId: 1,
    streamName: "Test 1"
}
const mockStreams = [
    mockSingleStream,
    {streamId: 2, streamName: "Test 2"}
]

const respAllStreams = {
    target: {
        streams: mockStreams
    }
}
const respSingleStream = {
    target: {
        stream: mockSingleStream
    }
}

class MockData {
    getAllStreams() {
        return mockStreams;
    }
}

describe('Stream Api', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = Enzyme.shallow(<StreamsTable dataSource={new MockData()} />)
    })
    afterEach(() => {
        jest.clearAllMocks();
    })

    describe('getStream', () => {
        it.only('should call axios.get and return a single stream\'s information', () => {
            const data =  {
                data: 123
            }
            StreamApi.getStream(123);
            
            expect(axios.get).toHaveBeenCalledWith(`http://localhost:8080/stream/123`);
        })
    })
    
})