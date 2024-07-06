package web.uet.backend.service;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType0Font;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import web.uet.backend.entity.business.Delivery;
import web.uet.backend.event.DeliveryCreateEvent;
import web.uet.backend.exception.type.NotFoundException;
import web.uet.backend.repository.business.jpa.DeliveryRepository;

import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import static java.lang.Character.toUpperCase;

@Service
@RequiredArgsConstructor
@Slf4j
public class PdfService {

    public static File INVOICE;
    public static String DELIVERY_PDF_SOURCE_PATH = "src/main/resources/deliveries/pdfs/";
    private final DeliveryRepository deliveryRepository;

    @PostConstruct
    public void loadSourceFile() throws IOException {
        PdfService.INVOICE = new File(DELIVERY_PDF_SOURCE_PATH + "invoice.pdf");
    }

    @EventListener
    @Async("asyncExecutor")
    public void handleDeliveryCreatedEvent(DeliveryCreateEvent event) throws IOException {
        Delivery delivery = (Delivery) event.getSource();
        savePdf(delivery);
    }

    public byte[] getDeliveryPdfByteBy(String deliveryPdfName) throws IOException {
        UUID deliveryId = UUID.fromString(deliveryPdfName.substring(9, 45));
        if (!deliveryRepository.existsById(deliveryId)) {
            throw new NotFoundException("Delivery not found");
        }

        if (!Files.exists(Paths.get(DELIVERY_PDF_SOURCE_PATH + deliveryPdfName))) {
            throw new NotFoundException("Delivery pdf not found");
        }

        Path path = Paths.get(DELIVERY_PDF_SOURCE_PATH + deliveryPdfName);
        return Files.readAllBytes(path);
    }

    private static void savePdf(Delivery delivery) throws IOException {
        write(delivery.getDeliveryId().toString(),
            delivery.getFromName(),
            delivery.getFromAddress(),
            delivery.getFromPhone(),
            delivery.getProductType().toString(),
            delivery.getName(),
            delivery.getFromDescription(),
            delivery.getCreatedAt().toString(),
            delivery.getToName(),
            delivery.getToAddress(),
            delivery.getToPhone(),
            delivery.getToDescription(),
            delivery.getWeight().toString() ,
            delivery.getShippingFee().toString(),
            delivery.getToShop().getShopId().toString(),
            ""
            );
    }

    private static void write(String deliveryId,
                             String senderName,
                             String senderLocation,
                             String senderPhone,
                             String type,
                             String name,
                             String senderNote,
                             String sendDate,
                             String receiverName,
                             String receiverLocation,
                             String receiverPhone,
                             String receiverNote,
                             String weight,
                             String cost,
                             String shop,
                             String receiveDate) throws IOException
    {
        PDDocument document = PDDocument.load(INVOICE);
        PDPage page = document.getPage(0);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < deliveryId.length(); i++) {
            if (deliveryId.charAt(i) != '-') {
                sb.append(toUpperCase(deliveryId.charAt(i)));
            }
        }
        addText(document, page,sb.toString(), 500, 498, 12);
        addText(document, page,senderName, 185, 452, 12);
        addText(document, page,receiverName, 560, 452, 12);

        int maxLength = 42;
        if (senderLocation.length() > maxLength) {
            int breakPoint = senderLocation.lastIndexOf(" ", maxLength);
            if (breakPoint == -1) {
                breakPoint = maxLength;
            }

            String firstPart = senderLocation.substring(0, breakPoint);
            String secondPart = senderLocation.substring(breakPoint).trim();
            addText(document, page, firstPart, 95, 435, 10);
            addText(document, page, secondPart, 95, 423, 10);
        } else {
            addText(document, page, senderLocation, 95, 435, 12);
        }

        if (receiverLocation.length() > maxLength) {
            int breakPoint = receiverLocation.lastIndexOf(" ", maxLength);
            if (breakPoint == -1) {
                breakPoint = maxLength;
            }

            String firstPart = receiverLocation.substring(0, breakPoint);
            String secondPart = receiverLocation.substring(breakPoint).trim();
            addText(document, page, firstPart, 455, 435, 10);
            addText(document, page, secondPart, 455, 423, 10);
        } else {
            addText(document, page, receiverLocation, 455, 435, 12);
        }

        addText(document, page,senderPhone, 75, 405, 12);
        addText(document, page,receiverPhone, 435, 405, 12);
        if (type.equals("DOCUMENT")) {
            addText(document, page,"x", 117, 370, 15);
        }
        else {
            addText(document, page,"x", 207, 370, 15);
        }
        addText(document, page,name, 105, 330, 12);
        if (senderNote.length() > 65) {
            int breakPoint = senderNote.lastIndexOf(" ", 65);
            if (breakPoint == -1) {
                breakPoint = 65;
            }

            String firstPart = senderNote.substring(0, breakPoint);
            String secondPart = senderNote.substring(breakPoint).trim();
            addText(document, page,firstPart, 38, 305, 10);
            addText(document, page,secondPart, 38, 293, 10);
        } else {
            addText(document, page,senderNote, 38, 305, 10);
        }
        if (receiverNote.length() > 65) {
            int breakPoint = receiverNote.lastIndexOf(" ", 65);
            if (breakPoint == -1) {
                breakPoint = 65;
            }

            String firstPart = receiverNote.substring(0, breakPoint);
            String secondPart = receiverNote.substring(breakPoint).trim();
            addText(document, page,firstPart, 400, 367, 10);
            addText(document, page,secondPart, 400, 355, 10);
        } else {
            addText(document, page,receiverNote, 400, 367, 10);
        }

        addText(document, page,weight, 510, 295, 12);
        addText(document, page,cost + " đ", 535, 267, 20);
        addText(document, page,shop, 530, 230, 12);
        StringBuilder sb2 = new StringBuilder();
        for (int i = 0; i < sendDate.length(); i++) {
            if (sendDate.charAt(i) != 'T') {
                if (i <= 18){
                    sb2.append(toUpperCase(sendDate.charAt(i)));
                }
            }
            else {
                sb2.append(" ");
            }
        }
        addText(document, page,sb2.toString(), 38, 132, 12);
        addText(document, page,receiveDate, 582, 218, 12);
        document.save(DELIVERY_PDF_SOURCE_PATH + "delivery_"+ deliveryId +".pdf");
        document.close();
    }

    private static void addText(PDDocument document, PDPage page, String value, int pos_x, int pos_y, int fontSize) throws IOException {
        File fontFile = new File(DELIVERY_PDF_SOURCE_PATH + "bvp.ttf");
        PDType0Font customFont = PDType0Font.load(document, fontFile);
        PDPageContentStream contentStream = new PDPageContentStream(document, page, PDPageContentStream.AppendMode.APPEND, true);
        contentStream.beginText();
        contentStream.setFont(customFont, fontSize);
        contentStream.setNonStrokingColor(Color.BLACK);
        contentStream.newLineAtOffset(pos_x, pos_y);
        contentStream.showText(value);
        contentStream.endText();
        contentStream.close();
    }

}