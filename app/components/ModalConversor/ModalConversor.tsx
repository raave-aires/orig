import { Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { NumericFormat } from "react-number-format";

export function ModalConversor({quilos, setQuilos, tonelada, setTonelada}: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const input_props_quilos = {
        label: "Volume em quilos (kg)",
        className: "max-w-64",
    };

    const input_props_tonelada = {
        label: "Volume em toneladas (t)",
        className: "max-w-64",
    };

    return (
        <>
            <Button onPress={onOpen}>Open Modal</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>

                            <ModalBody>
                                <NumericFormat
                                    customInput={Input}
                                    {...input_props_quilos}
                                    variant="faded"

                                    valueIsNumericString={true}
                                    thousandSeparator=" "
                                    decimalSeparator=","

                                    value={quilos}
                                    onChange={(e) => setQuilos(e.target.value)}
                                />

                                <NumericFormat
                                    customInput={Input}
                                    {...input_props_tonelada}
                                    variant="faded"
                                    isDisabled={true}

                                    valueIsNumericString={true}
                                    thousandSeparator=" "
                                    decimalSeparator=","

                                    value={tonelada}
                                    onChange={(e) => setTonelada(e.target.value)}
                                />
                            </ModalBody>

                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Dispensar
                                </Button>

                                <Button color="primary" onPress={onClose}>
                                    Usar valor
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

interface Props {
    quilos: string; setQuilos: (e: string) => void;
    tonelada: string; setTonelada: (e: string) => void;
}