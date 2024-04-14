require('dotenv').config()
const { Bot, Keyboard, InlineKeyboard, GrammyError, HttpError } = require('grammy');
const {hydrate } = require('@grammyjs/hydrate')
const bot = new Bot(process.env.BOT_API_KEY)

bot.use(hydrate());







// 09.04.24 Tr

const linkArray =  [
    'https://ibb.co/8mCPz7q',
    'https://ibb.co/9GkvyVy',
    'https://ibb.co/k5mbsgz',
    'https://ibb.co/2WTtW0g',
    'https://ibb.co/8mCPz7q',
    'https://ibb.co/0h6jv9x',
    'https://ibb.co/g70nLzX',
    'https://ibb.co/5W3Xbfs',
    'https://ibb.co/Jtr8JLp',
    'https://ibb.co/ss77Pqh',
    'https://ibb.co/mzzyS6N',
    'https://ibb.co/zWvMnQf',
    'https://ibb.co/Jtr8JLp',
    'https://ibb.co/CQg6t6L',
    'https://ibb.co/qW02h7t',
    'https://ibb.co/zWvMnQf',
    'https://ibb.co/k5mbsgz',
    'https://ibb.co/YN2m4Dw',
    'https://ibb.co/j3MmTyx',
    'https://ibb.co/9GkvyVy',
    'https://ibb.co/q7V4Kgn',
    'https://ibb.co/tK5X76c',
    'https://ibb.co/CP84CRd',
    'https://ibb.co/7NSTQ1K',
    'https://ibb.co/F0JGZbz',
    'https://ibb.co/PzgGVpR',
    'https://ibb.co/FxL7tQ0',
    'https://ibb.co/5nfLWNd',
    'https://ibb.co/wzn54V1',
    'https://ibb.co/jLCvrWm',
    'https://ibb.co/PMcw0Vz',

  ];
  






bot.command('start', async (ctx) => {
    isRegistered = false;
    const inlineKeyboard = new InlineKeyboard()
        .text('KAYIT', 'GetRegister');
    await ctx.replyWithPhoto('https://i.ytimg.com/vi/D4BORFJpqa0/maxresdefault.jpg');
    await ctx.reply('💎MINES V2"ye hoş geldiniz💎  \n\n💣 Mayınlar, <b>1WIN</b> bahis şirketinde klasik <b>Bomb Squad</b> oyununa dayanan bir kumar oyunudur.\n\nAmacınız güvenli hücreleri açmak ve tuzaklara düşmekten kaçınmaktır.\n\nBotumuz Bitsgap"ten bir sinir ağına dayanmaktadır Yıldızların yerini <b>%87</b> olasılıkla tahmin edebilir.', {
        reply_markup: inlineKeyboard,
        parse_mode:'HTML'

    });
  });



  bot.on('callback_query:data', async (ctx) => {
    if (ctx.callbackQuery.data === 'GetRegister') {
        const inlineKeyboard = new InlineKeyboard().text('KİMLİĞİ DOĞRULA', 'CheckId');
        await ctx.replyWithPhoto('https://postimg.cc/BjdJzX6S');
        await ctx.reply('1. İlk olarak, 1WIN <a href="https://1wdrwn.life/v3/landing-page/casino#uihs">CLICK</a> web sitesindeki bağlantı üzerinden kayıt olun.\n2. 2. Başarılı bir kayıttan sonra, sitedeki kimliğinizi kopyalayın (Sekme şarj ve sağ üst köşede kimliğiniz olacaktır).\n3. 3. Kimliği doğrulaya tıkladıktan ve kimliğinizi yazdıktan sonra', {
            reply_markup: inlineKeyboard,
            parse_mode:'HTML'
        });
    }
    else if (ctx.callbackQuery.data === 'CheckId') {
        isRegistered = true;
    }
  
    if (ctx.callbackQuery.data === 'GetSignal') {
        const SignalKeyboard = new InlineKeyboard()
        .text('BIR SINYAL ALMAK','GetSignalGlav');
    
        const randomIndex = Math.floor(Math.random() * linkArray.length);
        
        const randomLink = linkArray[randomIndex];
        await ctx.replyWithPhoto(randomLink, {
          reply_markup: SignalKeyboard
        });
      }


      if (ctx.callbackQuery.data === 'GetSignalGlav') {
        const SignalKeyboard = new InlineKeyboard().text('BIR SINYAL ALMAK', 'GetSignalGlav');
        
        
        if (ctx.msg.message_id) {
            await ctx.api.deleteMessage(ctx.msg.chat.id, ctx.msg.message_id);
        }
    
        
        let statusMessage = await ctx.reply(`Yükleniyor: 1%`);
    
        for (let i = 2; i <= 100; i += 10) {
            
            const randomProgress = Math.floor(Math.random() * 11 + (i > 10 ? i - 10 : 0));
            
            await ctx.api.sendChatAction(ctx.msg.chat.id, 'upload_photo', { progress: randomProgress });
            await new Promise(resolve => setTimeout(resolve, 500));
            await statusMessage.editText(`Yükleniyor: ${randomProgress}%`).catch(() => {});;
        }
    
         await statusMessage.editText("Готово!");

         setTimeout(() => statusMessage.delete().catch(() => {}), 500);


        const randomIndex = Math.floor(Math.random() * linkArray.length);
        const randomLink = linkArray[randomIndex];
    

        const newStatusMessage = await ctx.replyWithPhoto(randomLink, {
            reply_markup: SignalKeyboard
        });
    
        await ctx.api.sendChatAction(ctx.msg.chat.id, 'typing');
    }



  });


  let isRegistered = false;

  bot.hears(/.*/, async function registrationHandler(ctx) {
    const SignalKeyboard = new InlineKeyboard()
    .text('BIR SINYAL ALMAK','GetSignal');
    if (isRegistered) {
        
        if (ctx.message.text.length !== 8 || !/^\d+$/.test(ctx.message.text)) {
            await ctx.reply('Hatalı kayıt numarası formatı, kayıt başarısız oldu');
        } else {
            await ctx.reply('Kayıt başarılı oldu', {
              
                reply_markup: SignalKeyboard
                
            });
            isRegistered = false;
        }
    }
  });


  bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
      console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
      console.error("Could not contact Telegram:", e);
    } else {
      console.error("Unknown error:", e);
    }
  });

bot.start()
