using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using Kumojin.Backend.Application.Events;
using Kumojin.Backend.Domain.KumojinEvents;
using Kumojin.Backend.Infrastructure.KumojinEvents;
using Kumojin.Backend.Tests.Helpers;
using Xunit;
using Moq;

namespace Kumojin.Backend.Tests.Application.KumojinEvents
{
    public class KumojinEventServiceTests
    {
        private KumojinEventService _kumojinEventService;
        private readonly Mock<IKumojinEventRepository> _kumojinEventRepositoryMock;

        private ICollection<KumojinEvent> _kumojinEventsMock;

        public KumojinEventServiceTests()
        {
            _kumojinEventRepositoryMock = new Mock<IKumojinEventRepository>();
            _kumojinEventService = new KumojinEventService(_kumojinEventRepositoryMock.Object);

            _kumojinEventsMock = KumojinEventStubs.Get_List_Stub();
        }

        [Fact]
        public async Task ListAsync_Should_Return_The_Events_List()
        {
            // Arrange
            _kumojinEventRepositoryMock.Setup(x => x.GetListAsync()).ReturnsAsync(_kumojinEventsMock);

            // Act
            var list = await _kumojinEventService.ListAsync();

            // Assert
            Assert.NotNull(list);
            _kumojinEventRepositoryMock.Verify(x => x.GetListAsync(), Times.Once);
        }

        [Fact]
        public async Task CreateAsync_Should_Insert_A_Valid_New_Entity()
        {
            // Arrange
            var newEvent = _kumojinEventsMock.ToList()[0];
            _kumojinEventRepositoryMock.Setup(x => x.InsertAsync(newEvent));

            // Act
            await _kumojinEventService.CreateAsync(newEvent);

            // Assert
            _kumojinEventRepositoryMock.Verify(x => x.InsertAsync(newEvent), Times.Once);
        }

        [Fact]
        public async Task CreateAsync_Should_Throw_An_Error_With_Invalid_New_Entity_And_Not_Call_InsertAsync()
        {
            // Arrange
            var newEvent = _kumojinEventsMock.ToList()[0];
            newEvent.DisplayName = "this name is longer than thirty two characters, its not valid for saving. " +
                                   "It will throw an error, please dont panic !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";

            _kumojinEventRepositoryMock.Setup(x => x.InsertAsync(newEvent));

            // Act
            // Assert
            await Assert.ThrowsAsync<ValidationException>(() => _kumojinEventService.CreateAsync(newEvent));
            _kumojinEventRepositoryMock.Verify(x => x.InsertAsync(newEvent), Times.Never);
        }
        
        [Fact]
        public async Task CreateAsync_Should_Map_Received_Dates_To_UTC_Time()
        {
            // Arrange
            var newEvent = _kumojinEventsMock.ToList()[0];
            _kumojinEventRepositoryMock.Setup(x => x.InsertAsync(newEvent));

            // Act
            await _kumojinEventService.CreateAsync(newEvent);

            // Assert
            _kumojinEventRepositoryMock.Verify(x => x.InsertAsync(newEvent), Times.Once);
            Assert.Equal(new DateTime(2021, 12, 31, 19, 00, 00), newEvent.StartAt);
            Assert.Equal(new DateTime(2022, 01, 01, 19, 00, 00), newEvent.EndAt);
        }
    }
}