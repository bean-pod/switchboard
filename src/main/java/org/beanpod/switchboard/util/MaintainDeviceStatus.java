package org.beanpod.switchboard.util;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.DeviceDaoImpl;
import org.beanpod.switchboard.dto.DecoderDto;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.mapper.DeviceMapper;
import org.beanpod.switchboard.entity.DummyInterface;
import org.beanpod.switchboard.service.LogService;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Component
@RequiredArgsConstructor
public class MaintainDeviceStatus {
    private static final DateUtil date = new DateUtil();
    private final DeviceDaoImpl service;
    private final DeviceMapper deviceMapper;
    private final LogService logService;

    /*
     * maintain and create logs when decoders or encoders are retrieved
     * T should be of type DecoderEntity or EncoderEntity
     */
    public <T extends DummyInterface> void maintainStatusField(List<T> devices) {
        Date dateToBeCompared = getDateToBeCompared();

        for (int i = 0; i < devices.size(); i++) {
            //if status field equals online and lastCommunication is more than 10minutes old
            if (((devices.get(i)).getDevice().getStatus())
                    .equalsIgnoreCase("online")
                    && dateToBeCompared.after(devices.get(i).getLastCommunication())) {
                //update last_communication field to offline
                (devices.get(i).getDevice()).setStatus("offline");
                service.save(deviceMapper.toDeviceDto(devices.get(i).getDevice()));

                //create a log
                createLog("offline", (devices.get(i)).getSerialNumber());
            } else if (((devices.get(i)).getDevice().getStatus())
                    .equalsIgnoreCase("offline")
                    && dateToBeCompared.before(devices.get(i).getLastCommunication())) {
                //update last_communication field to offline
                (devices.get(i).getDevice()).setStatus("online");
                service.save(deviceMapper.toDeviceDto(devices.get(i).getDevice()));

                //create a log
                createLog("online", (devices.get(i)).getSerialNumber());
            }
        }
    }

    //maintain and create logs when streams are retrieved
    public void maintainStatusField(StreamDto streamDto) {
        Date dateToBeCompared = getDateToBeCompared();

        DecoderDto decoder = streamDto.getInputChannel().getDecoder();
        EncoderDto encoder = streamDto.getOutputChannel().getEncoder();

        //update the status field for decoder
        if ((decoder.getDevice().getStatus()).equalsIgnoreCase("offline")) {
            decoder.getDevice().setStatus("online");
            service.save(decoder.getDevice());

            //create a log
            createLog("online", decoder.getSerialNumber());
        }

        //update the status field for encoder
        if ((encoder.getDevice().getStatus()).equalsIgnoreCase("offline")) {
            encoder.getDevice().setStatus("online");
            service.save(encoder.getDevice());

            //create a log
            createLog("online", encoder.getSerialNumber());
        }
    }

    private void createLog(String status, String serialNumber) {
        String message = "A device has been updated with a status of " + status;
        logService.createLog(message, "info", serialNumber);
    }

    private Date getDateToBeCompared() {
        //subtract 10minutes from the current date
        Date dateToBeCompared = date.getCurrentDate();
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
        dateToBeCompared.setTime(System.currentTimeMillis() - 600000);

        return dateToBeCompared;
    }

}
