"use client";

// importação de dependências:
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form"

//bibliotecas de componentes:
import { DatePicker } from "@nextui-org/react";

//importação de funções:

// bibliotecas de ícones:

export function FormMisto(){
  const { control, handleSubmit } = useForm({
    defaultValues: {
      data_de_contrato: null,
    },
  })

  return(
    <>
      <Controller
        name="data_de_contrato"
        control={control}
        render={({ field }) => <DatePicker {...field} />}
      />
    </>
  );
}

