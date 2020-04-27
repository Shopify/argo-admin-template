import React, {useState, useCallback} from 'react';
import {Modal as PolarisModal, ModalProps} from '@shopify/polaris';
import {ArgoHeader} from './Header';
import {ExtensionPoint, RenderExtensionComponentProps} from '@shopify/app-extensions-renderer';
import {retain} from '@shopify/remote-ui-core';

import {AppExtension} from '../../AppExtension';
import useModalActionsInput from '../../utils/useModalActionInput';

interface ArgoModalProps {
  open: boolean;
  defaultTitle: string;
  onClose: () => void;
  onBackClick?: () => void;
  appInfo: {
    icon?: string;
    name: string;
  };
  height?: string;
}

type Props<T extends ExtensionPoint> = ArgoModalProps & RenderExtensionComponentProps<T>;

type Action = () => void;
const noop = () => null;

export function Modal<T extends ExtensionPoint>({
  open,
  defaultTitle,
  appInfo,
  onClose,
  onBackClick,
  extensionPoint,
  script,
  components,
  input,
  height,
}: Props<T>) {
  const [primaryContent, setPrimaryContent] = useState('Save');
  const [primaryAction, setPrimaryAction] = useState<Action>(() => noop);
  const [secondaryContent, setSecondaryContent] = useState('');
  const [secondaryAction, setSecondaryAction] = useState<Action>(() => noop);

  const {name, icon} = appInfo;

  const setPrimaryActionCallback = useCallback(
    (f: Action) => {
      setPrimaryAction(() => f);
      retain(f);
    },
    [primaryAction],
  );

  const setSecondaryActionCallback = useCallback(
    (f: Action) => {
      setSecondaryAction(() => f);
      retain(f);
    },
    [secondaryAction],
  );

  const modalActions = useModalActionsInput({
    setPrimaryContent,
    setPrimaryAction: setPrimaryActionCallback,
    setSecondaryContent,
    setSecondaryAction: setSecondaryActionCallback,
    closeModal: onClose,
  });

  const modalProps: ModalProps = {
    primaryAction: {
      content: primaryContent,
      onAction: primaryAction,
    },
    onClose,
    open,
    title: (
      <ArgoHeader appName={name} appIcon={icon} title={defaultTitle} onBackAction={onBackClick} />
    ),
  };

  if (secondaryContent) {
    modalProps.secondaryActions = [
      {
        content: secondaryContent,
        onAction: secondaryAction,
      },
    ];
  }

  const inputWithModalActions = {...modalActions, ...input} as typeof input;

  return (
    <>
      <PolarisModal {...modalProps}>
        <div
          className="ArgoModal-content"
          style={{
            height,
          }}
        >
          <AppExtension
            script={script}
            extensionPoint={extensionPoint}
            components={components}
            input={inputWithModalActions}
          />
        </div>
      </PolarisModal>
    </>
  );
}
