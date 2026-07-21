import React from 'react';

const CustomToast = ({ closeToast, title, message, type = 'success', timestamp = 'Just Now' }) => {
  const styles = {
    success: {
      border: 'border-primary-stitch',
      bgIcon: 'bg-primary-stitch/10',
      textIcon: 'text-primary-stitch',
      iconName: 'check_circle',
      fill: 1
    },
    update: {
      border: 'border-secondary',
      bgIcon: 'bg-secondary/10',
      textIcon: 'text-secondary',
      iconName: 'sync',
      fill: 0
    },
    error: {
      border: 'border-error',
      bgIcon: 'bg-error/10',
      textIcon: 'text-error',
      iconName: 'error_outline',
      fill: 0
    },
    info: {
      border: 'border-outline',
      bgIcon: 'bg-surface-container/50',
      textIcon: 'text-outline',
      iconName: 'edit_note',
      fill: 0
    }
  };

  const currentStyle = styles[type] || styles.success;

  return (
    <div className={`bg-white/80 dark:bg-inverse-surface/80 backdrop-blur-md p-8 rounded-2xl shadow-[0_10px_40px_-10px_rgba(21,29,29,0.06)] flex items-start gap-4 border-l-4 ${currentStyle.border} transition-all hover:translate-x-1 min-w-[360px] max-w-md`}>
      <div className={`${currentStyle.bgIcon} p-3 rounded-lg flex items-center justify-center`}>
        <span className={`material-symbols-outlined ${currentStyle.textIcon}`} style={{ fontVariationSettings: `'FILL' ${currentStyle.fill}`, fontSize: '24px' }}>
          {currentStyle.iconName}
        </span>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-headline font-bold text-on-surface dark:text-inverse-on-surface text-base">{title}</h3>
          <span className="text-[12px] font-bold uppercase tracking-widest text-on-surface-variant/50">{timestamp}</span>
        </div>
        <p className="text-sm text-on-surface-variant dark:text-slate-400 leading-snug font-body">{message}</p>
        {type === 'error' && (
          <div className="mt-4 flex gap-4">
            <button className="text-sm font-bold text-error hover:underline uppercase tracking-wider">Retry</button>
            <button className="text-sm font-bold text-on-surface-variant/60 hover:underline uppercase tracking-wider">Ignore</button>
          </div>
        )}
      </div>
      <button onClick={closeToast} className="text-outline-variant hover:text-on-surface-variant transition-colors">
        <span className="material-symbols-outlined text-base">close</span>
      </button>
    </div>
  );
};

export default CustomToast;
